import { EmbroideredWordPatches } from '@/components/ui/embroidered-word-patches';

export default function EmbroideryDemo() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-8 text-center">
          Embroidered Word Patches Demo
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
            <h2 className="text-2xl font-semibold text-white mb-4">Default Size</h2>
            <div className="flex justify-center">
              <EmbroideredWordPatches />
            </div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
            <h2 className="text-2xl font-semibold text-white mb-4">Large Version</h2>
            <div className="flex justify-center">
              <EmbroideredWordPatches width={500} height={400} />
            </div>
          </div>
        </div>
        
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
          <h2 className="text-2xl font-semibold text-white mb-4">Extra Wide</h2>
          <div className="flex justify-center">
            <EmbroideredWordPatches width={800} height={300} />
          </div>
        </div>
        
        <div className="mt-12 text-center">
          <h3 className="text-xl text-white/80 mb-4">Perfect for Your Gym Website!</h3>
          <p className="text-white/60 max-w-2xl mx-auto">
            This embroidered patches component features gym-themed words: <strong>STRONG</strong>, <strong>FIT</strong>, and <strong>ELITE</strong>. 
            Each patch has realistic embroidery effects with stitching patterns, fabric texture, and authentic coloring.
          </p>
        </div>
      </div>
    </div>
  );
}