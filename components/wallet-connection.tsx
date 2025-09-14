"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Smartphone, Monitor, Wallet, Copy, Check } from "lucide-react"
import { connectWallet, getBalance, isMobileDevice } from "@/lib/solana"

interface WalletConnectionProps {
  onWalletConnected?: (address: string, balance: number) => void
}

export function WalletConnection({ onWalletConnected }: WalletConnectionProps) {
  const [isConnecting, setIsConnecting] = useState(false)
  const [walletAddress, setWalletAddress] = useState<string>("")
  const [balance, setBalance] = useState<number>(0)
  const [isCopied, setIsCopied] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    setIsMobile(isMobileDevice())
  }, [])

  const handleConnect = async () => {
    setIsConnecting(true)
    try {
      const address = await connectWallet()
      const walletBalance = await getBalance(address)

      setWalletAddress(address)
      setBalance(walletBalance)

      if (onWalletConnected) {
        onWalletConnected(address, walletBalance)
      }
    } catch (error) {
      console.error("Failed to connect wallet:", error)
      alert("Failed to connect wallet. Please try again.")
    } finally {
      setIsConnecting(false)
    }
  }

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(walletAddress)
    setIsCopied(true)
    setTimeout(() => setIsCopied(false), 2000)
  }

  const handleDisconnect = () => {
    setWalletAddress("")
    setBalance(0)
  }

  if (walletAddress) {
    return (
      <Card className="bg-black/50 border-green-500/30">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Wallet className="h-4 w-4 text-green-400" />
              <span className="text-sm text-green-400">Connected</span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleDisconnect}
              className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
            >
              Disconnect
            </Button>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-400">Address:</span>
              <div className="flex items-center gap-2">
                <span className="text-sm font-mono text-white">
                  {`${walletAddress.slice(0, 4)}...${walletAddress.slice(-4)}`}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleCopyAddress}
                  className="h-6 w-6 p-0 text-green-400 hover:text-green-300"
                >
                  {isCopied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                </Button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-400">Balance:</span>
              <span className="text-sm font-mono text-white">{balance.toFixed(4)} SOL</span>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="bg-black/50 border-green-500/30">
      <CardContent className="p-4">
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            {isMobile ? (
              <Smartphone className="h-8 w-8 text-green-400" />
            ) : (
              <Monitor className="h-8 w-8 text-green-400" />
            )}
          </div>

          <div>
            <h3 className="text-lg font-semibold text-green-400 mb-2">Connect Wallet</h3>
            <p className="text-sm text-gray-400 mb-4">
              {isMobile
                ? "Connect your Solana mobile wallet to get started"
                : "Connect your browser wallet to get started"}
            </p>
          </div>

          <Button
            onClick={handleConnect}
            disabled={isConnecting}
            className="w-full bg-green-500 text-black hover:bg-green-600"
          >
            {isConnecting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-black mr-2" />
                Connecting...
              </>
            ) : (
              <>
                <Wallet className="mr-2 h-4 w-4" />
                {isMobile ? "Connect Mobile Wallet" : "Connect Wallet"}
              </>
            )}
          </Button>

          {isMobile && (
            <p className="text-xs text-gray-500">Supports Phantom, Solflare, and other Solana mobile wallets</p>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
