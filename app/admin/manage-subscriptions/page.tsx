import React from "react";
import Container from "@/app/components/Container";
import ManageSubClient from "./ManageSubsClient";

async function ManageSubscription() {
  return (
    <div>
      <Container>
        <ManageSubClient />
      </Container>
    </div>
  );
}

export default ManageSubscription;
