"use client"

import type React from "react"
import { WalletConnection } from "@/components/wallet-connection"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Loader2 } from "lucide-react"

export function NewLP() {
  const [isLoading, setIsLoading] = useState(false)
  const [walletAddress, setWalletAddress] = useState("")
  const [solBalance, setSolBalance] = useState(0)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      alert("Liquidity Pool creation initiated!")
    }, 2000)
  }

  const handleClearForm = () => {
    const form = document.getElementById("lp-form") as HTMLFormElement
    if (form) form.reset()
  }

  const handleWalletConnected = (address: string, balance: number) => {
    setWalletAddress(address)
    setSolBalance(balance)
  }

  return (
    <form id="lp-form" onSubmit={handleSubmit} className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-green-400">Create New Liquidity Pool</h2>
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
          <Label htmlFor="token-a" className="text-green-400">
            Token A
          </Label>
          <Input
            id="token-a"
            placeholder="Token A address"
            className="bg-black/50 border-green-500/30 focus:border-green-500 text-white"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="token-a-amount" className="text-green-400">
            Token A Amount
          </Label>
          <Input
            id="token-a-amount"
            type="number"
            placeholder="Amount of Token A"
            className="bg-black/50 border-green-500/30 focus:border-green-500 text-white"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="token-b" className="text-green-400">
            Token B
          </Label>
          <Input
            id="token-b"
            placeholder="Token B address"
            className="bg-black/50 border-green-500/30 focus:border-green-500 text-white"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="token-b-amount" className="text-green-400">
            Token B Amount
          </Label>
          <Input
            id="token-b-amount"
            type="number"
            placeholder="Amount of Token B"
            className="bg-black/50 border-green-500/30 focus:border-green-500 text-white"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="fee-tier" className="text-green-400">
            Fee Tier
          </Label>
          <Select>
            <SelectTrigger className="bg-black/50 border-green-500/30 focus:border-green-500 text-white">
              <SelectValue placeholder="Select fee tier" />
            </SelectTrigger>
            <SelectContent className="bg-black border-green-500/30">
              <SelectItem value="0.01">0.01%</SelectItem>
              <SelectItem value="0.05">0.05%</SelectItem>
              <SelectItem value="0.3">0.3%</SelectItem>
              <SelectItem value="1">1%</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="dex" className="text-green-400">
            DEX
          </Label>
          <Select>
            <SelectTrigger className="bg-black/50 border-green-500/30 focus:border-green-500 text-white">
              <SelectValue placeholder="Select DEX" />
            </SelectTrigger>
            <SelectContent className="bg-black border-green-500/30">
              <SelectItem value="orca">Orca</SelectItem>
              <SelectItem value="raydium">Raydium</SelectItem>
              <SelectItem value="jupiter">Jupiter</SelectItem>
            </SelectContent>
          </Select>
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
            Creating Liquidity Pool...
          </>
        ) : !walletAddress ? (
          "Connect Wallet First"
        ) : (
          "Create Liquidity Pool"
        )}
      </Button>
    </form>
  )
}
