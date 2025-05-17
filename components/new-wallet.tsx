"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Loader2, Copy, Check, Download } from "lucide-react"

export function NewWallet() {
  const [isLoading, setIsLoading] = useState(false)
  const [isWalletCreated, setIsWalletCreated] = useState(false)
  const [publicKey, setPublicKey] = useState("")
  const [seedPhrase, setSeedPhrase] = useState("")
  const [isSeedPhraseCopied, setIsSeedPhraseCopied] = useState(false)
  const [isPublicKeyCopied, setIsPublicKeyCopied] = useState(false)

  const handleCreateWallet = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate wallet creation
    setTimeout(() => {
      setIsLoading(false)
      setIsWalletCreated(true)
      setPublicKey("8xDUGUzWrwj6WT9LZ8VCJKHnxqTRYMPWyC6yzGKnq9Mt")
      setSeedPhrase("valley alien library bread worry brother bundle hammer loyal barely dune brave")
    }, 2000)
  }

  const handleCopySeedPhrase = () => {
    navigator.clipboard.writeText(seedPhrase)
    setIsSeedPhraseCopied(true)
    setTimeout(() => setIsSeedPhraseCopied(false), 2000)
  }

  const handleCopyPublicKey = () => {
    navigator.clipboard.writeText(publicKey)
    setIsPublicKeyCopied(true)
    setTimeout(() => setIsPublicKeyCopied(false), 2000)
  }

  const handleDownloadKeyPair = () => {
    const data = JSON.stringify({
      publicKey,
      seedPhrase,
    })
    const blob = new Blob([data], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "solana-wallet-keypair.json"
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const handleReset = () => {
    setIsWalletCreated(false)
    setPublicKey("")
    setSeedPhrase("")
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-green-400">Create New Wallet</h2>
        {isWalletCreated && (
          <Button
            type="button"
            variant="outline"
            onClick={handleReset}
            className="bg-transparent border-green-500 text-green-400 hover:bg-green-500/10"
          >
            Create Another Wallet
          </Button>
        )}
      </div>

      {!isWalletCreated ? (
        <form onSubmit={handleCreateWallet} className="space-y-6">
          <div className="space-y-4">
            <div className="p-4 border border-yellow-500/30 bg-yellow-500/10 rounded-md">
              <p className="text-yellow-400 text-sm">
                Creating a new wallet will generate a seed phrase. Make sure to store it in a secure location. Anyone
                with access to your seed phrase can access your funds.
              </p>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox id="terms" />
              <Label htmlFor="terms" className="text-sm text-gray-300">
                I understand that I am responsible for safeguarding my seed phrase and private keys.
              </Label>
            </div>
          </div>

          <Button type="submit" className="w-full bg-green-500 text-black hover:bg-green-600" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating Wallet...
              </>
            ) : (
              "Create New Wallet"
            )}
          </Button>
        </form>
      ) : (
        <div className="space-y-6">
          <div className="p-6 border border-yellow-500/30 bg-yellow-500/10 rounded-md space-y-4">
            <div className="space-y-2">
              <Label className="text-yellow-400">Seed Phrase</Label>
              <div className="relative">
                <div className="p-3 bg-black/50 border border-green-500/30 rounded-md text-white break-all">
                  {seedPhrase}
                </div>
                <Button
                  type="button"
                  size="sm"
                  variant="ghost"
                  className="absolute right-2 top-2 text-green-400 hover:text-green-300 hover:bg-transparent"
                  onClick={handleCopySeedPhrase}
                >
                  {isSeedPhraseCopied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>
              <p className="text-red-400 text-xs">
                WARNING: Never share your seed phrase with anyone. Store it securely offline.
              </p>
            </div>

            <div className="space-y-2">
              <Label className="text-yellow-400">Public Key (Wallet Address)</Label>
              <div className="relative">
                <div className="p-3 bg-black/50 border border-green-500/30 rounded-md text-white break-all">
                  {publicKey}
                </div>
                <Button
                  type="button"
                  size="sm"
                  variant="ghost"
                  className="absolute right-2 top-2 text-green-400 hover:text-green-300 hover:bg-transparent"
                  onClick={handleCopyPublicKey}
                >
                  {isPublicKeyCopied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>
            </div>
          </div>

          <Button
            type="button"
            className="w-full bg-green-500 text-black hover:bg-green-600"
            onClick={handleDownloadKeyPair}
          >
            <Download className="mr-2 h-4 w-4" />
            Download Keypair
          </Button>
        </div>
      )}
    </div>
  )
}
