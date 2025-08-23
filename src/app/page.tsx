"use client";

import EscrowsByRoleCards from "@/components/tw-blocks/escrows/escrows-by-role/cards/EscrowsCards";
import EscrowsBySignerCards from "@/components/tw-blocks/escrows/escrows-by-signer/cards/EscrowsCards";
import EscrowsBySignerTable from "@/components/tw-blocks/escrows/escrows-by-signer/table/EscrowsTable";
import InitializeEscrowForm from "@/components/tw-blocks/escrows/single-release/initialize-escrow/form/InitializeEscrow";
import { WalletButton } from "@/components/tw-blocks/wallet-kit/WalletButtons";
import { Card, CardContent } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16">
      <header className="flex w-full justify-between items-center">
        <h1 className="text-2xl font-bold">Trustless Work</h1>
        <WalletButton />
      </header>

      <main className="flex flex-col gap-[32px]">
        <div className="container mx-auto max-w-3xl">
          <Card className="p-4">
            <CardContent>{/* <InitializeEscrowForm /> */}</CardContent>
          </Card>
        </div>

        {/* <EscrowsBySignerTable /> */}

        {/* <EscrowsBySignerCards /> */}

        <EscrowsByRoleCards />
      </main>
    </div>
  );
}
