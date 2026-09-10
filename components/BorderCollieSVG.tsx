import Image from 'next/image'

type Pose =
  | 'sitting'
  | 'standing'
  | 'waving'
  | 'sleeping'
  | 'pointing'
  | 'playbow'
  // 以下為素材提供的額外姿勢，可自由使用
  | 'running'
  | 'howling'
  | 'rollup'

interface BorderCollieSVGProps {
  className?: string
  size?: number
  pose?: Pose
}

// 各姿勢素材的寬高比（width / height）
const poseAspect: Record<Pose, number> = {
  sitting: 375 / 500,   // 敬禮
  standing: 367 / 500,
  waving: 244 / 500,    // 揮右手
  sleeping: 500 / 400,
  pointing: 243 / 500,  // 歪頭
  playbow: 338 / 500,
  running: 241 / 500,
  howling: 276 / 500,
  rollup: 428 / 500,
}

const poseFile = (pose: Pose) => `/dogs/${pose}.png`

/**
 * 邊境牧羊犬插畫元件。
 * 介面與舊版完全一致：size 控制高度，className 可覆蓋樣式。
 * waving=揮右手(首頁Hero)、pointing=歪頭(提示列)、sitting=敬禮(更多工具)
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
