import Image from 'next/image'

type Pose =
  | 'sitting'    // 敬禮（自製）
  | 'standing'   // 站立
  | 'waving'     // 揮右手（自製）
  | 'sleeping'   // 趴睡
  | 'pointing'   // 歪頭（自製）
  | 'playbow'    // 玩耍鞠躬
  | 'running'    // 奔跑
  | 'howling'    // 仰天長嘯
  | 'rollup'     // 翻肚
  | 'beg'        // 後腿站立討食
  | 'bone'       // 叼骨頭

interface BorderCollieSVGProps {
  className?: string
  size?: number
  pose?: Pose
}

// 各姿勢素材的寬高比（width / height），對應 public/dogs/ 的 11 張圖
const poseAspect: Record<Pose, number> = {
  sitting: 375 / 500,   // 敬禮（自製）
  standing: 367 / 500,  // 站立
  waving: 244 / 500,    // 揮右手（自製）
  sleeping: 500 / 400,  // 趴睡（寬版）
  pointing: 243 / 500,  // 歪頭（自製）
  playbow: 349 / 500,   // 玩耍鞠躬
  running: 241 / 500,   // 奔跑
  howling: 274 / 500,   // 仰天長嘯
  rollup: 392 / 500,    // 翻肚
  beg: 275 / 500,       // 後腿站立討食
  bone: 329 / 500,      // 叼骨頭
}

const poseFile = (pose: Pose) => `/dogs/${pose}.png`

/**
 * 邊境牧羊犬插畫元件。
 * 介面不變：size 控制高度，className 可覆蓋樣式。
 * 目前收錄 11 個 pose，對應 public/dogs/ 下的 11 張圖。
 */
function BorderCollieSVG({ className = '', size = 120, pose = 'sitting' }: BorderCollieSVGProps) {
  const width = Math.round(size * poseAspect[pose])
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={poseFile(pose)}
      alt={`邊境牧羊犬插畫（${pose}）`}
      width={width}
      height={size}
      className={className}
      style={{ width, height: size }}
    />
  )
}

export default BorderCollieSVG
export { BorderCollieSVG }
