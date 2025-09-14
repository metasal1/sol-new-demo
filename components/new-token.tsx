"use client"

import type React from "react"
import { WalletConnection } from "@/components/wallet-connection"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Loader2 } from "lucide-react"

export function NewToken() {
  const [isLoading, setIsLoading] = useState(false)
  const [walletAddress, setWalletAddress] = useState("")
  const [solBalance, setSolBalance] = useState(0)
  const [file, setFile] = useState<File | null>(null)
  const [fileName, setFileName] = useState("No file chosen")

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
      setFileName(e.target.files[0].name)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      alert("Token creation initiated!")
    }, 2000)
  }

  const handleClearForm = () => {
    setWalletAddress("")
    setSolBalance(0)
    setFile(null)
    setFileName("No file chosen")
    const form = document.getElementById("token-form") as HTMLFormElement
    if (form) form.reset()
  }

  const handleWalletConnected = (address: string, balance: number) => {
    setWalletAddress(address)
    setSolBalance(balance)
  }

  return (
    <form id="token-form" onSubmit={handleSubmit} className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-green-400">Create New Token</h2>
        <Button
          type="button"
          variant="outline"
          onClick={handleClearForm}
          className="bg-transparent border-green-500 text-green-400 hover:bg-green-500/10"
        >
          Clear Form
        </Button>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label className="text-green-400">Wallet Connection</Label>
          <WalletConnection onWalletConnected={handleWalletConnected} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="image-file" className="text-green-400">
            Image File
          </Label>
          <div className="flex gap-2">
            <Button
              type="button"
              onClick={() => document.getElementById("image-file")?.click()}
              className="bg-green-500 text-black hover:bg-green-600"
            >
              Choose File
            </Button>
            <span className="py-2 px-3 text-gray-400">{fileName}</span>
            <input id="image-file" type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="coin-name" className="text-green-400">
            Coin Name
          </Label>
          <Input
            id="coin-name"
            placeholder="e.g., Kanye West Meme"
            className="bg-black/50 border-green-500/30 focus:border-green-500 text-white"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="mint-wallet" className="text-green-400">
            Mint Wallet
          </Label>
          <Input
            id="mint-wallet"
            placeholder="Enter Solana wallet address"
            className="bg-black/50 border-green-500/30 focus:border-green-500 text-white"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="coin-symbol" className="text-green-400">
            Coin Symbol
          </Label>
          <Input
            id="coin-symbol"
            placeholder="e.g., YE"
            className="bg-black/50 border-green-500/30 focus:border-green-500 text-white"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="description" className="text-green-400">
            Description
          </Label>
          <Textarea
            id="description"
            placeholder="Enter coin description"
            className="bg-black/50 border-green-500/30 focus:border-green-500 text-white min-h-[100px]"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="twitter" className="text-green-400">
            Twitter Handle (Optional)
          </Label>
          <Input
            id="twitter"
            placeholder="https://x.com/metasal_"
            className="bg-black/50 border-green-500/30 focus:border-green-500 text-white"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="discord" className="text-green-400">
            Discord Handle (Optional)
          </Label>
          <Input
            id="discord"
            placeholder="discord.gg/metasal"
            className="bg-black/50 border-green-500/30 focus:border-green-500 text-white"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="telegram" className="text-green-400">
            Telegram Handle (Optional)
          </Label>
          <Input
            id="telegram"
            placeholder="t.me/metasal"
            className="bg-black/50 border-green-500/30 focus:border-green-500 text-white"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="website" className="text-green-400">
            Website (Optional)
          </Label>
          <Input
            id="website"
            placeholder="https://sol.new"
            className="bg-black/50 border-green-500/30 focus:border-green-500 text-white"
          />
        </div>
      </div>

      <Button
        type="submit"
        className="w-full bg-green-500 text-black hover:bg-green-600"
        disabled={isLoading || !walletAddress}
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Creating Token...
          </>
        ) : !walletAddress ? (
          "Connect Wallet First"
        ) : (
          "Create Token"
        )}
      </Button>
    </form>
  )
}
