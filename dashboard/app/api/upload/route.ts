import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";
import { NextResponse } from "next/server";
import { auth } from "../../../lib/auth";
import { getProjects, saveProjects, Asset } from "../../../lib/store";

export async function POST(request: Request): Promise<NextResponse> {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  const body = (await request.json()) as HandleUploadBody;

  try {
    const jsonResponse = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async () => {
        return {
          allowedContentTypes: ["video/*", "image/*"],
          addRandomSuffix: true,
        };
      },
      onUploadCompleted: async ({ blob, tokenPayload }) => {
        const payload = tokenPayload ? JSON.parse(tokenPayload) : {};
        const { slug, kind, siteName } = payload as {
          slug?: string;
          kind?: Asset["kind"];
          siteName?: string;
        };
        if (!slug) return;

        const projects = await getProjects();
        const idx = projects.findIndex((p) => p.slug === slug);
        if (idx === -1) return;

        const asset: Asset = {
          id: crypto.randomUUID(),
          filename: blob.pathname.split("/").pop() || blob.pathname,
          url: blob.url,
          kind: kind || "still",
          siteName,
          uploadedAt: new Date().toISOString(),
        };

        projects[idx].assets.push(asset);
        projects[idx].updatedAt = new Date().toISOString();
        await saveProjects(projects);
      },
    });

    return NextResponse.json(jsonResponse);
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 400 });
  }
}
