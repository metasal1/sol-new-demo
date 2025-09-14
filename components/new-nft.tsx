"use client"

import type React from "react"
import { WalletConnection } from "@/components/wallet-connection"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Loader2 } from "lucide-react"

export function NewNFT() {
  const [isLoading, setIsLoading] = useState(false)
  const [file, setFile] = useState<File | null>(null)
  const [fileName, setFileName] = useState("No file chosen")
  const [walletAddress, setWalletAddress] = useState("")
  const [solBalance, setSolBalance] = useState(0)

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
      alert("NFT creation initiated!")
    }, 2000)
  }

  const handleClearForm = () => {
    setFile(null)
    setFileName("No file chosen")
    setWalletAddress("")
    setSolBalance(0)
    const form = document.getElementById("nft-form") as HTMLFormElement
    if (form) form.reset()
  }

  const handleWalletConnected = (address: string, balance: number) => {
    setWalletAddress(address)
    setSolBalance(balance)
  }

  return (
    <form id="nft-form" onSubmit={handleSubmit} className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-green-400">Create New NFT</h2>
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
          <Label htmlFor="nft-file" className="text-green-400">
            NFT Image/Media
          </Label>
          <div className="flex gap-2">
            <Button
              type="button"
              onClick={() => document.getElementById("nft-file")?.click()}
              className="bg-green-500 text-black hover:bg-green-600"
            >
              Choose File
            </Button>
            <span className="py-2 px-3 text-gray-400">{fileName}</span>
            <input id="nft-file" type="file" accept="image/*,video/*" onChange={handleFileChange} className="hidden" />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="nft-name" className="text-green-400">
            NFT Name
          </Label>
          <Input
            id="nft-name"
            placeholder="Enter NFT name"
            className="bg-black/50 border-green-500/30 focus:border-green-500 text-white"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="nft-description" className="text-green-400">
            Description
          </Label>
          <Textarea
            id="nft-description"
            placeholder="Enter NFT description"
            className="bg-black/50 border-green-500/30 focus:border-green-500 text-white min-h-[100px]"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="nft-attributes" className="text-green-400">
            Attributes (Optional)
          </Label>
          <Textarea
            id="nft-attributes"
            placeholder="Enter attributes in JSON format"
            className="bg-black/50 border-green-500/30 focus:border-green-500 text-white"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="nft-royalty" className="text-green-400">
            Royalty Percentage
          </Label>
          <Input
            id="nft-royalty"
            type="number"
            placeholder="e.g., 5"
            className="bg-black/50 border-green-500/30 focus:border-green-500 text-white"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="nft-collection" className="text-green-400">
            Collection (Optional)
          </Label>
          <Input
            id="nft-collection"
            placeholder="Collection address"
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
            Creating NFT...
          </>
        ) : !walletAddress ? (
          "Connect Wallet First"
        ) : (
          "Create NFT"
        )}
      </Button>
    </form>
  )
}
