import CreateAgreement from "@/components/create-agreement-dialog";
import Agreements from "@/components/agreements";
import React from "react";

const AgreementPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <CreateAgreement />
      <Agreements />
    </div>
  );
};

export default AgreementPage;
