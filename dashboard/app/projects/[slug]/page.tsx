import { getProjects, getLocations, STAGE_CHECKLISTS, previousStage } from "../../../lib/store";
import { getChannel } from "../../../lib/channels";
import StageSelector from "./StageSelector";
import StageChecklist from "./StageChecklist";
import SitePicker from "./SitePicker";
import UploadForm from "./UploadForm";
import NotesEditor from "./NotesEditor";
import ScriptEditor from "./ScriptEditor";
import GenerateScriptButton from "./GenerateScriptButton";
import PackageDraft from "./PackageDraft";
import DeleteButton from "./DeleteButton";
import PublishForm from "./PublishForm";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function ProjectPage({ params }: { params: { slug: string } }) {
  const projects = await getProjects();
  const project = projects.find((p) => p.slug === params.slug);
  if (!project) notFound();

  const channel = getChannel(project.channel);
  const rawFootage = project.assets.filter((a) => a.kind === "raw-footage");
  const stills = project.assets.filter((a) => a.kind === "still");
  const checklistItems = STAGE_CHECKLISTS[project.stage] || [];
  const locations =
    project.stage === "Record/Create Media" && project.channel === "jungle-nidra"
      ? await getLocations()
      : null;

  return (
    <div className="shell">
      <h1>{project.title}</h1>
      <p style={{ color: "var(--text-dim)" }}>
        Channel: <strong>{channel.name}</strong> &nbsp;·&nbsp; Slug: <code>{project.slug}</code>{" "}
        — matches the package/script files in <code>02-packaging/</code> and{" "}
        <code>03-scripts/</code> if this video went through <code>/jn-production-line</code>.
      </p>

      <h2>Current stage: {project.stage}</h2>
      <StageChecklist
        slug={project.slug}
        stage={project.stage}
        items={checklistItems}
        completed={project.completedSteps[project.stage] || []}
        previousStage={previousStage(project.stage)}
      />
      {locations && (
        <>
          <h3 style={{ marginTop: 20 }}>Pick site(s) for this project</h3>
          <SitePicker slug={project.slug} categories={locations} scoutedSites={project.scoutedSites || []} />
        </>
      )}
      <p style={{ fontSize: 13, color: "var(--text-dim)", marginTop: 10 }}>
        Checking the last box here auto-advances the project to the next stage.
      </p>

      <details style={{ marginTop: 16 }}>
        <summary style={{ cursor: "pointer", fontSize: 13, color: "var(--text-dim)" }}>
          Jump to a different stage manually
        </summary>
        <div style={{ marginTop: 10 }}>
          <StageSelector slug={project.slug} stage={project.stage} />
        </div>
      </details>

      <h2>Brand reference</h2>
      <div className="card">
        {channel.brand.palette.length === 0 ? (
          <p style={{ margin: 0, fontSize: 13, color: "var(--text-dim)" }}>
            No brand palette set yet for {channel.name}.
          </p>
        ) : (
          <div className="swatches" style={{ margin: 0 }}>
            {channel.brand.palette.map((p) => (
              <div className="swatch" key={p.label}>
                <div className="swatch-color" style={{ background: p.color }} />
                <div className="swatch-label">
                  {p.label}
                  {p.usage ? ` (${p.usage})` : ""}
                </div>
              </div>
            ))}
          </div>
        )}
        <p style={{ marginTop: 14, marginBottom: 0, fontSize: 13 }}>
          {channel.identity.anonymityRules || channel.brand.imageryNotes}
          {channel.slug === "jungle-nidra" && (
            <>
              {" "}
              Full details: <a href="/brand">Brand guide</a>.
            </>
          )}
        </p>
        {channel.brand.typography && (
          <p style={{ marginTop: 8, marginBottom: 0, fontSize: 13, color: "var(--text-dim)" }}>
            Type: {channel.brand.typography}
          </p>
        )}
      </div>

      {channel.slug === "jungle-nidra" &&
        (project.stage === "Idea" || project.packageStatus) && (
          <>
            <h2>Package</h2>
            <PackageDraft
              slug={project.slug}
              titleOptions={project.titleOptions}
              thumbnailConcept={project.thumbnailConcept}
              openingLines={project.openingLines}
              packageStatus={project.packageStatus}
            />
          </>
        )}

      {project.stage === "Script Generated" && (
        <>
          <h2>Script</h2>
          <GenerateScriptButton slug={project.slug} />
          <ScriptEditor slug={project.slug} script={project.script} />
        </>
      )}

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
