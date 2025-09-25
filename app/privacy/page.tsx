import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export default function Privacy() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <header className="container mx-auto py-6 flex items-center gap-4">
        <Link href="/">
          <Button variant="ghost" size="sm" className="text-green-400 hover:text-green-300 hover:bg-green-500/10">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
        </Link>
        <div className="flex items-center gap-3">
          <Image src="/logo.png" alt="sol.new logo" width={32} height={32} className="w-8 h-8" />
          <h1 className="text-3xl font-bold text-green-400">sol.new</h1>
        </div>
      </header>

      <main className="flex-1 container mx-auto py-8">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-2xl font-bold text-green-400 mb-6">Privacy Policy</h1>
          <div className="space-y-4 text-gray-300">
            <p>We respect your privacy and are committed to protecting your personal data.</p>
            <p>We do not collect, store, or share personal information without your consent.</p>
            <p>Wallet connections are handled locally and securely through your browser.</p>
            <p>Last updated: January 2024</p>
          </div>
        </div>
      </main>
    </div>
  )
}
