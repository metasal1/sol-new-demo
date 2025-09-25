"use client"
import Link from "next/link"
import Image from "next/image"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { NewToken } from "@/components/new-token"
import { NewNFT } from "@/components/new-nft"
import { NewLP } from "@/components/new-lp"
import { NewWallet } from "@/components/new-wallet"
import { Button } from "@/components/ui/button"
import { Sparkles } from "lucide-react"

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <header className="container mx-auto py-6 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Image src="/logo.png" alt="sol.new logo" width={48} height={48} className="w-12 h-12" />
          <h1 className="text-3xl font-bold text-green-400">sol.new</h1>
        </div>
        <h2 className="text-xl font-medium text-green-400">just coin it</h2>
        <div className="flex gap-4">
          <Link href="https://solana.com" target="_blank">
            <Button variant="outline" className="border-green-500 text-green-400 hover:bg-green-500/10 bg-transparent">
              Learn More
            </Button>
          </Link>
        </div>
      </header>

      <main className="flex-1 container mx-auto py-8">
        <div className="max-w-4xl mx-auto">
          <Tabs defaultValue="token" className="w-full">
            <TabsList className="grid grid-cols-4 mb-8">
              <TabsTrigger value="token" className="data-[state=active]:bg-green-500 data-[state=active]:text-black">
                New Token
              </TabsTrigger>
              <TabsTrigger value="nft" className="data-[state=active]:bg-green-500 data-[state=active]:text-black">
                New NFT
              </TabsTrigger>
              <TabsTrigger value="lp" className="data-[state=active]:bg-green-500 data-[state=active]:text-black">
                New LP
              </TabsTrigger>
              <TabsTrigger value="wallet" className="data-[state=active]:bg-green-500 data-[state=active]:text-black">
                New Wallet
              </TabsTrigger>
            </TabsList>
            <div className="border border-green-500/30 rounded-lg p-6 bg-black/50 backdrop-blur-sm">
              <TabsContent value="token" className="mt-0">
                <NewToken />
              </TabsContent>
              <TabsContent value="nft" className="mt-0">
                <NewNFT />
              </TabsContent>
              <TabsContent value="lp" className="mt-0">
                <NewLP />
              </TabsContent>
              <TabsContent value="wallet" className="mt-0">
                <NewWallet />
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </main>

      <footer className="border-t border-green-500/20 py-6">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <Sparkles className="h-5 w-5 text-green-400" />
            <span className="text-sm text-green-400">Powered by Solana</span>
          </div>
          <div className="flex gap-4 text-sm text-gray-400">
            <Link href="https://metasal.xyz" className="hover:text-green-400">
              metasal.xyz
            </Link>
            <Link href="/privacy" className="hover:text-green-400">
              Privacy
            </Link>
            <Link href="/copyright" className="hover:text-green-400">
              Copyright
            </Link>
            <Link href="/license" className="hover:text-green-400">
              License
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
