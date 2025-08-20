import React from "react";

const ProjectPage = ({ params }: PageProps) => {
  // params.id is an array because of [...id] (catch-all route)
  const projectId = params.id.join("/");

  console.log("Project ID:", projectId);

  return (
    <div className="min-h-screen bg-primary-background-900 text-white p-8"></div>
  );
};

export default ProjectPage;
