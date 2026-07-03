import { getProjects } from "../../../lib/store";
import StageSelector from "./StageSelector";
import UploadForm from "./UploadForm";
import NotesEditor from "./NotesEditor";
import DeleteButton from "./DeleteButton";
import PublishForm from "./PublishForm";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

const PALETTE = [
  { label: "Deep blue", color: "#1f3a52" },
  { label: "Soft moss green", color: "#4f6b52" },
  { label: "Warm amber glow", color: "#c9903f" },
];

export default async function ProjectPage({ params }: { params: { slug: string } }) {
  const projects = await getProjects();
  const project = projects.find((p) => p.slug === params.slug);
  if (!project) notFound();

  const rawFootage = project.assets.filter((a) => a.kind === "raw-footage");
  const stills = project.assets.filter((a) => a.kind === "still");

  return (
    <div className="shell">
      <h1>{project.title}</h1>
      <p style={{ color: "var(--text-dim)" }}>
        Slug: <code>{project.slug}</code> — matches the package/script files in{" "}
        <code>02-packaging/</code> and <code>03-scripts/</code> if this video went through{" "}
        <code>/jn-production-line</code>.
      </p>

      <h2>Stage</h2>
      <StageSelector slug={project.slug} stage={project.stage} />

      <h2>Brand reference</h2>
      <div className="card">
        <div className="swatches" style={{ margin: 0 }}>
          {PALETTE.map((p) => (
            <div className="swatch" key={p.label}>
              <div className="swatch-color" style={{ background: p.color }} />
              <div className="swatch-label">{p.label}</div>
            </div>
          ))}
        </div>
        <p style={{ marginTop: 14, marginBottom: 0, fontSize: 13 }}>
          No face, no name, no cross-brand references. Full details: <a href="/brand">Brand guide</a>.
        </p>
      </div>

      <h2>Upload</h2>
      <UploadForm slug={project.slug} />

      <h2>
        Raw footage ({rawFootage.length}) &nbsp;·&nbsp; Stills ({stills.length})
      </h2>
      {project.assets.length === 0 ? (
        <p>Nothing uploaded yet.</p>
      ) : (
        <div className="grid">
          {project.assets.map((a) => (
            <div className="card" key={a.id}>
              {a.kind === "still" ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={a.url}
                  alt={a.filename}
                  style={{ width: "100%", borderRadius: 6, marginBottom: 10 }}
                />
              ) : (
                <video
                  src={a.url}
                  controls
                  style={{ width: "100%", borderRadius: 6, marginBottom: 10 }}
                />
              )}
              <p style={{ fontSize: 13, margin: 0 }}>{a.filename}</p>
              <p style={{ fontSize: 12, color: "var(--text-dim)", margin: "4px 0 0" }}>
                {a.siteName ? `${a.siteName} · ` : ""}
                {a.kind}
              </p>
            </div>
          ))}
        </div>
      )}

      <h2>Notes</h2>
      <NotesEditor slug={project.slug} notes={project.notes} />

      <h2>Publish</h2>
      <PublishForm
        slug={project.slug}
        publishUrl={project.publishUrl}
        publishedAt={project.publishedAt}
      />

      <div style={{ marginTop: 32 }}>
        <DeleteButton slug={project.slug} />
      </div>
    </div>
  );
}
