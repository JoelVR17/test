"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import useEscrowDetailDialog from "./useDetailsEscrow";
import Link from "next/link";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Info, Users, ListChecks, QrCode } from "lucide-react";
// import FundEscrowDialog from "./FundEscrowDialog";
// import QREscrowDialog from "./QREscrowDialog";
// import ResolveDisputeEscrowDialog from "./ResolveDisputeEscrowDialog";
// import EditMilestonesDialog from "./EditMilestonesDialog";
// import {
//   SuccessReleaseDialog,
//   SuccessResolveDisputeDialog,
// } from "./SuccessDialog";
import { useEscrowDialogs } from "../../escrow-context/EscrowDialogsProvider";
// import CompleteMilestoneDialog from "./CompleteMilestoneDialog";
// import EditEntitiesDialog from "./EditEntitiesDialog";
// import EditBasicPropertiesDialog from "./EditBasicPropertiesDialog";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import type {
  GetEscrowsFromIndexerResponse as Escrow,
  Role,
} from "@trustless-work/escrow/types";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProgressEscrow from "./ProgressEscrow";
import { FooterDetails } from "./Footer";
import { Milestones } from "./Milestones";
import { Entities } from "./Entities";
import { GeneralInformation } from "./GeneralInformation";
import { useEscrowContext } from "../../escrow-context/EscrowProvider";

interface EscrowDetailDialogProps {
  isDialogOpen: boolean;
  activeRole: Role;
  setIsDialogOpen: (value: boolean) => void;
  setSelectedEscrow: (selectedEscrow?: Escrow) => void;
}

const EscrowDetailDialog = ({
  isDialogOpen,
  setIsDialogOpen,
  setSelectedEscrow,
  activeRole,
}: EscrowDetailDialogProps) => {
  const { selectedEscrow } = useEscrowContext();
  const dialogStates = useEscrowDialogs();
  // const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  // const [isRestoreConfirmOpen, setIsRestoreConfirmOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("general");

  // const { softDeleteEscrow, restoreEscrow } = useGlobalBoundedStore();

  const {
    handleClose,
    setEvidenceVisibleMap,
    evidenceVisibleMap,
    areAllMilestonesCompleted,
    areAllMilestonesCompletedAndFlag,
    userRolesInEscrow,
  } = useEscrowDetailDialog({
    setIsDialogOpen,
    setSelectedEscrow,
    selectedEscrow,
  });

  // Get the appropriate Stellar Explorer URL based on network. You should change this to the correct network.
  const stellarExplorerUrl = `https://stellar.expert/explorer/testnet/contract/${selectedEscrow?.contractId}`;

  if (!isDialogOpen || !selectedEscrow) return null;
  return (
    <>
      <Dialog open={isDialogOpen} onOpenChange={handleClose}>
        <DialogContent className="w-11/12 sm:w-3/4 h-[95vh] overflow-hidden flex flex-col">
          <DialogHeader className="flex-shrink-0">
            <div className="w-full">
              <div className="flex flex-col gap-2">
                <div className="w-full">
                  <Link
                    href={stellarExplorerUrl}
                    target="_blank"
                    className="hover:underline"
                  >
                    <DialogTitle className="text-xl">
                      {selectedEscrow.title}
                    </DialogTitle>
                  </Link>
                </div>

                <DialogDescription>
                  {selectedEscrow.description}
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>

          {/* Main Content with Tabs */}
          <Card className="overflow-hidden flex-1 flex-col hidden sm:flex">
            <CardContent className="p-6 flex-1 overflow-y-auto">
              <Tabs
                defaultValue="general"
                className="w-full"
                value={activeTab}
                onValueChange={setActiveTab}
              >
                <TabsList className="grid w-full grid-cols-3 mb-6 bg-muted/50">
                  <TabsTrigger
                    value="general"
                    className="flex items-center gap-2 data-[state=active]:bg-background"
                  >
                    <Info className="h-4 w-4 hidden md:block" />
                    <span>Information</span>
                  </TabsTrigger>
                  <TabsTrigger
                    value="entities"
                    className="flex items-center gap-2 data-[state=active]:bg-background"
                  >
                    <Users className="h-4 w-4 hidden md:block" />
                    <span>Entities</span>
                  </TabsTrigger>
                  <TabsTrigger
                    value="milestones"
                    className="flex items-center gap-2 data-[state=active]:bg-background"
                  >
                    <ListChecks className="h-4 w-4 hidden md:block" />
                    <span>Milestones</span>
                  </TabsTrigger>
                </TabsList>

                <div className="flex-1 min-h-0">
                  {/* General Information Tab */}
                  <TabsContent value="general" className="mt-4 h-full">
                    <GeneralInformation
                      activeRole={activeRole}
                      selectedEscrow={selectedEscrow}
                      userRolesInEscrow={userRolesInEscrow}
                      dialogStates={dialogStates}
                      areAllMilestonesCompleted={areAllMilestonesCompleted}
                      areAllMilestonesCompletedAndFlag={
                        areAllMilestonesCompletedAndFlag
                      }
                    />
                  </TabsContent>

                  {/* Entities Tab */}
                  <TabsContent value="entities" className="mt-4 h-full">
                    <Entities
                      activeRole={activeRole}
                      selectedEscrow={selectedEscrow}
                      userRolesInEscrow={userRolesInEscrow}
                      dialogStates={dialogStates}
                    />
                  </TabsContent>

                  {/* Milestones Tab */}
                  <TabsContent value="milestones" className="mt-4 h-full">
                    <Card className="p-4 h-full">
                      <Milestones
                        activeRole={activeRole}
                        selectedEscrow={selectedEscrow}
                        userRolesInEscrow={userRolesInEscrow}
                        setEvidenceVisibleMap={setEvidenceVisibleMap}
                        evidenceVisibleMap={evidenceVisibleMap}
                      />
                    </Card>
                  </TabsContent>
                </div>
              </Tabs>
            </CardContent>

            <Separator className="my-4" />

            <CardFooter className="flex sm:flex-row flex-col w-full justify-between items-center flex-shrink-0 px-6">
              {activeTab === "milestones" ? (
                <ProgressEscrow escrow={selectedEscrow} />
              ) : (
                <>
                  <FooterDetails selectedEscrow={selectedEscrow} />

                  <div className="flex gap-4">
                    <Button
                      onClick={(e) => {
                        e.stopPropagation();
                        dialogStates.qr.setIsOpen(true);
                      }}
                      className="w-1/4"
                      variant="outline"
                    >
                      <QrCode className="h-4 w-4" />
                    </Button>
                  </div>
                </>
              )}
            </CardFooter>
          </Card>

          {/* Mobile Content - No Card wrapper */}
          <div className="flex-1 flex flex-col sm:hidden overflow-hidden">
            <div className="p-2 flex-1 overflow-y-auto">
              <Tabs
                defaultValue="general"
                className="w-full"
                value={activeTab}
                onValueChange={setActiveTab}
              >
                <TabsList className="grid w-full grid-cols-3 mb-6 bg-muted/50">
                  <TabsTrigger
                    value="general"
                    className="flex items-center gap-2 data-[state=active]:bg-background"
                  >
                    <Info className="h-4 w-4 hidden md:block" />
                    <span>Information</span>
                  </TabsTrigger>
                  <TabsTrigger
                    value="entities"
                    className="flex items-center gap-2 data-[state=active]:bg-background"
                  >
                    <Users className="h-4 w-4 hidden md:block" />
                    <span>Entities</span>
                  </TabsTrigger>
                  <TabsTrigger
                    value="milestones"
                    className="flex items-center gap-2 data-[state=active]:bg-background"
                  >
                    <ListChecks className="h-4 w-4 hidden md:block" />
                    <span>Milestones</span>
                  </TabsTrigger>
                </TabsList>

                <div className="flex-1 min-h-0">
                  {/* General Information Tab */}
                  <TabsContent value="general" className="mt-4 h-full">
                    <GeneralInformation
                      activeRole={activeRole}
                      selectedEscrow={selectedEscrow}
                      userRolesInEscrow={userRolesInEscrow}
                      dialogStates={dialogStates}
                      areAllMilestonesCompleted={areAllMilestonesCompleted}
                      areAllMilestonesCompletedAndFlag={
                        areAllMilestonesCompletedAndFlag
                      }
                    />
                  </TabsContent>

                  {/* Entities Tab */}
                  <TabsContent value="entities" className="mt-4 h-full">
                    <Entities
                      activeRole={activeRole}
                      selectedEscrow={selectedEscrow}
                      userRolesInEscrow={userRolesInEscrow}
                      dialogStates={dialogStates}
                    />
                  </TabsContent>

                  {/* Milestones Tab */}
                  <TabsContent value="milestones" className="mt-4 h-full">
                    <Card className="p-4 h-full">
                      <Milestones
                        activeRole={activeRole}
                        selectedEscrow={selectedEscrow}
                        userRolesInEscrow={userRolesInEscrow}
                        setEvidenceVisibleMap={setEvidenceVisibleMap}
                        evidenceVisibleMap={evidenceVisibleMap}
                      />
                    </Card>
                  </TabsContent>
                </div>
              </Tabs>
            </div>

            <Separator className="my-4" />

            <div className="sm:flex-row flex-col w-full justify-between items-center flex-shrink-0 px-6 pb-6 hidden sm:flex">
              {activeTab === "milestones" ? (
                <ProgressEscrow escrow={selectedEscrow} />
              ) : (
                <>
                  <FooterDetails selectedEscrow={selectedEscrow} />

                  <div className="flex gap-4">
                    <Button
                      onClick={(e) => {
                        e.stopPropagation();
                        dialogStates.qr.setIsOpen(true);
                      }}
                      className="w-1/4"
                      variant="outline"
                    >
                      <QrCode className="h-4 w-4" />
                    </Button>
                  </div>
                </>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* External Dialogs */}
      {/* <FundEscrowDialog
        isSecondDialogOpen={dialogStates.second.isOpen}
        setIsSecondDialogOpen={dialogStates.second.setIsOpen}
      />

      <CompleteMilestoneDialog
        isCompleteMilestoneDialogOpen={dialogStates.completeMilestone.isOpen}
        setIsCompleteMilestoneDialogOpen={
          dialogStates.completeMilestone.setIsOpen
        }
      />

      <QREscrowDialog
        isQRDialogOpen={dialogStates.qr.isOpen}
        setIsQRDialogOpen={dialogStates.qr.setIsOpen}
      />

      <ResolveDisputeEscrowDialog
        isResolveDisputeDialogOpen={dialogStates.resolveDispute.isOpen}
      />

      <EditMilestonesDialog
        isEditMilestoneDialogOpen={dialogStates.editMilestone.isOpen}
        setIsEditMilestoneDialogOpen={dialogStates.editMilestone.setIsOpen}
      />

      <EditEntitiesDialog
        isEditEntitiesDialogOpen={dialogStates.editEntities.isOpen}
        setIsEditEntitiesDialogOpen={dialogStates.editEntities.setIsOpen}
      />

      <EditBasicPropertiesDialog
        isEditBasicPropertiesDialogOpen={
          dialogStates.editBasicProperties.isOpen
        }
        setIsEditBasicPropertiesDialogOpen={
          dialogStates.editBasicProperties.setIsOpen
        }
      />

      <SuccessReleaseDialog
        isSuccessReleaseDialogOpen={dialogStates.successRelease.isOpen}
        setIsSuccessReleaseDialogOpen={dialogStates.successRelease.setIsOpen}
        title=""
        description="releasedDescription"
      />

      <SuccessResolveDisputeDialog
        isSuccessResolveDisputeDialogOpen={
          dialogStates.successResolveDispute.isOpen
        }
        setIsSuccessResolveDisputeDialogOpen={
          dialogStates.successResolveDispute.setIsOpen
        }
        title=""
        description="resolvedDescription"
      /> */}
    </>
  );
};

export default EscrowDetailDialog;
