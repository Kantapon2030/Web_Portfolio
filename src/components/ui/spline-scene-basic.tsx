import { SplineScene } from "@/components/ui/splite";
import { Card } from "@/components/ui/card";
import { Spotlight } from "@/components/ui/spotlight";

export function SplineSceneBasic() {
  return (
    <Card className="w-full min-h-[460px] md:h-[500px] bg-black/[0.96] relative overflow-hidden border-neutral-800 shadow-[0_0_50px_rgba(0,0,0,0.8)]">
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill="white"
      />
      
      <div className="flex flex-col md:flex-row h-full">
        {/* Left content: Personal Motto */}
        <div className="flex-1 p-8 sm:p-12 relative z-10 flex flex-col justify-center">
          <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full bg-white/5 border border-white/10 w-fit">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[11px] font-mono uppercase tracking-widest text-neutral-400">
              Personal Motto &bull; คติประจำใจ
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 tracking-tight leading-tight">
            “Everything is Impossible”
          </h1>
          <p className="mt-4 text-neutral-300 max-w-lg text-sm sm:text-base font-light leading-relaxed">
            ทุกสิ่งดูเหมือนจะเป็นไปไม่ได้... จนกระทั่งเราลงมือศึกษา ค้นคว้า ออกแบบระบบ และพิสูจน์ให้เห็นจริงด้วยผลงาน
          </p>

          {/* Interactive 3D Cursor Hint */}
          <div className="mt-6 flex items-center gap-2 text-xs font-mono text-neutral-400">
            <span className="px-2.5 py-0.5 rounded-full bg-white/10 text-neutral-300 border border-white/10">Interactive 3D Robot</span>
            <span>หุ่นยนต์มองและขยับตามตำแหน่งเคอร์เซอร์เมาส์</span>
          </div>
        </div>

        {/* Right content: 3D Spline Scene Robot */}
        <div className="flex-1 relative min-h-[320px] md:min-h-full">
          <SplineScene 
            scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
            className="w-full h-full"
          />
        </div>
      </div>
    </Card>
  );
}

export default SplineSceneBasic;
