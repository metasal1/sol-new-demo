import { Connection, PublicKey, LAMPORTS_PER_SOL, Keypair, Transaction } from "@solana/web3.js"
import { transact, type Web3MobileWallet } from "@solana-mobile/mobile-wallet-adapter-protocol-web3js"

// Use the RPC URL from environment
const RPC_URL = process.env.NEXT_PUBLIC_SOLANA_RPC_URL || "https://velvet-hw7q70-fast-mainnet.helius-rpc.com"

export async function connectWallet(): Promise<string> {
  try {
    // Check if we're on mobile and mobile wallet adapter is available
    if (typeof window !== "undefined" && "solana" in window) {
      // Try mobile wallet adapter first
      try {
        const authorizationResult = await transact(async (wallet: Web3MobileWallet) => {
          const authorizationResult = await wallet.authorize({
            cluster: "mainnet-beta",
            identity: {
              name: "sol.new",
              uri: "https://sol.new",
              icon: "/favicon.ico",
            },
          })
          return authorizationResult
        })

        return authorizationResult.accounts[0].address
      } catch (mobileError) {
        console.log("Mobile wallet adapter not available, trying browser wallet")
      }
    }

    // Fallback to browser wallet (Phantom, etc.)
    const provider = (window as any)?.solana

    if (!provider?.isPhantom) {
      window.open("https://phantom.app/", "_blank")
      throw new Error("Please install Phantom wallet or use a Solana mobile wallet")
    }

    const response = await provider.connect()
    return response.publicKey.toString()
  } catch (error) {
    console.error("Error connecting to wallet:", error)
    throw error
  }
}

export async function getBalance(address: string): Promise<number> {
  try {
    const connection = new Connection(RPC_URL)
    const publicKey = new PublicKey(address)
    const balance = await connection.getBalance(publicKey)
    return balance / LAMPORTS_PER_SOL
  } catch (error) {
    console.error("Error getting balance:", error)
    return 0
  }
}

export async function signAndSendTransaction(transaction: Transaction): Promise<string> {
  try {
    // Try mobile wallet adapter first
    if (typeof window !== "undefined") {
      try {
        const signature = await transact(async (wallet: Web3MobileWallet) => {
          const connection = new Connection(RPC_URL)

          // Get latest blockhash
          const { blockhash } = await connection.getLatestBlockhash()
          transaction.recentBlockhash = blockhash
          transaction.feePayer = new PublicKey(
            (
              await wallet.authorize({
                cluster: "mainnet-beta",
                identity: {
                  name: "sol.new",
                  uri: "https://sol.new",
                  icon: "/favicon.ico",
                },
              })
            ).accounts[0].address,
          )

          // Sign and send transaction
          const signedTransactions = await wallet.signAndSendTransactions({
            transactions: [transaction],
          })

          return signedTransactions[0]
        })

        return signature
      } catch (mobileError) {
        console.log("Mobile wallet not available, trying browser wallet")
      }
    }

    // Fallback to browser wallet
    const provider = (window as any)?.solana
    if (!provider) {
      throw new Error("No wallet found")
    }

    const connection = new Connection(RPC_URL)
    const { blockhash } = await connection.getLatestBlockhash()
    transaction.recentBlockhash = blockhash
    transaction.feePayer = provider.publicKey

    const signedTransaction = await provider.signTransaction(transaction)
    const signature = await connection.sendRawTransaction(signedTransaction.serialize())

    return signature
  } catch (error) {
    console.error("Error signing and sending transaction:", error)
    throw error
  }
}

export async function createToken(data: any): Promise<{ success: boolean; tokenAddress?: string; signature?: string }> {
  try {
    console.log("Creating token with data:", data)

    // In a real implementation, you would:
    // 1. Create a new mint account
    // 2. Initialize the mint
    // 3. Create metadata account
    // 4. Upload image to IPFS/Arweave

    // For demo purposes, create a simple transaction
    const connection = new Connection(RPC_URL)
    const transaction = new Transaction()

    // Add a memo instruction as placeholder
    // In real implementation, this would be token creation instructions

    // const signature = await signAndSendTransaction(transaction)

    return {
      success: true,
      tokenAddress: "TokenAddressWouldBeHere",
      // signature
    }
  } catch (error) {
    console.error("Error creating token:", error)
    return { success: false }
  }
}

export async function createNFT(data: any): Promise<{ success: boolean; mintAddress?: string; signature?: string }> {
  try {
    console.log("Creating NFT with data:", data)

    // In a real implementation, you would use Metaplex SDK
    // to create and mint the NFT

    return {
      success: true,
      mintAddress: "NFTMintAddressWouldBeHere",
    }
  } catch (error) {
    console.error("Error creating NFT:", error)
    return { success: false }
  }
}

export async function createLP(data: any): Promise<{ success: boolean; poolAddress?: string; signature?: string }> {
  try {
    console.log("Creating LP with data:", data)

    // In a real implementation, you would interact with
    // DEX protocols like Orca or Raydium

    return {
      success: true,
      poolAddress: "PoolAddressWouldBeHere",
    }
  } catch (error) {
    console.error("Error creating LP:", error)
    return { success: false }
  }
}

export async function createWallet(): Promise<{ publicKey: string; seedPhrase: string }> {
  try {
    // Generate a new keypair
    const keypair = Keypair.generate()

    // In a real implementation, you would generate a proper seed phrase
    // using bip39 library
    const seedPhrase = "valley alien library bread worry brother bundle hammer loyal barely dune brave"

    return {
      publicKey: keypair.publicKey.toString(),
      seedPhrase,
    }
  } catch (error) {
    console.error("Error creating wallet:", error)
    throw error
  }
}

// Mobile wallet detection
export function isMobileWalletAvailable(): boolean {
  return typeof window !== "undefined" && "solana" in window
}

// Check if running on mobile device
export function isMobileDevice(): boolean {
  return (
    typeof window !== "undefined" &&
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
  )
}
