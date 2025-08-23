"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  GetEscrowsFromIndexerResponse as Escrow,
  Role,
} from "@trustless-work/escrow/types";
import { Pencil } from "lucide-react";
import type {
  DialogStates,
  StatusStates,
} from "../../escrow-context/EscrowDialogsProvider";
import EntityCard from "./EntityCard";

interface EntitiesProps {
  selectedEscrow: Escrow;
  userRolesInEscrow: string[];
  dialogStates: DialogStates & StatusStates;
  activeRole: Role;
}

export const Entities = ({
  selectedEscrow,
  userRolesInEscrow,
  dialogStates,
  activeRole,
}: EntitiesProps) => {
  return (
    <Card className="p-4 h-full">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <h3 className="text-lg font-semibold">Entities</h3>
        </div>

        {userRolesInEscrow.includes("platformAddress") &&
          !selectedEscrow?.flags?.disputed &&
          !selectedEscrow?.flags?.resolved &&
          !selectedEscrow?.flags?.released &&
          activeRole === "platformAddress" && (
            <Button
              onClick={(e) => {
                e.stopPropagation();
                dialogStates.editEntities.setIsOpen(true);
              }}
              className="text-xs"
              variant="ghost"
              disabled={selectedEscrow.balance !== 0}
            >
              <Pencil className="h-4 w-4 mr-2" />
              Edit Entities
            </Button>
          )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <EntityCard
          type="approver"
          entity={selectedEscrow.roles?.approver}
          inDispute={selectedEscrow.flags?.disputed}
        />
        <EntityCard
          type="serviceProvider"
          entity={selectedEscrow.roles?.serviceProvider}
          inDispute={selectedEscrow.flags?.disputed}
        />
        <EntityCard
          type="disputeResolver"
          entity={selectedEscrow.roles?.disputeResolver}
        />
        <EntityCard
          type="platformAddress"
          entity={selectedEscrow.roles?.platformAddress}
          hasPercentage
          percentage={selectedEscrow.platformFee}
        />
        <EntityCard
          type="releaseSigner"
          entity={selectedEscrow.roles?.releaseSigner}
        />
        <EntityCard type="receiver" entity={selectedEscrow.roles?.receiver} />
      </div>
    </Card>
  );
};
