import React, { useEffect, useRef, useState } from 'react'
import Animated, {
  Easing,
  useSharedValue,
  useAnimatedProps,
  withTiming,
  interpolateColor
} from 'react-native-reanimated'
import Svg, { Defs, ClipPath, G, Path } from 'react-native-svg'
import AnimatedStroke from './animated-stroke'

const MARGIN = 10
const vWidth = 64 + MARGIN
const vHeight = 64 + MARGIN
const checkMarkPath =
  'M15 31.1977C23.1081 36.4884 29.5946 43 29.5946 43C29.5946 43 37.5 25.5 69 1.5'
const outlineBoxPath =
  'M24 0.5H40C48.5809 0.5 54.4147 2.18067 58.117 5.88299C61.8193 9.58532 63.5 15.4191 63.5 24V40C63.5 48.5809 61.8193 54.4147 58.117 58.117C54.4147 61.8193 48.5809 63.5 40 63.5H24C15.4191 63.5 9.58532 61.8193 5.88299 58.117C2.18067 54.4147 0.5 48.5809 0.5 40V24C0.5 15.4191 2.18067 9.58532 5.88299 5.88299C9.58532 2.18067 15.4191 0.5 24 0.5Z'

const AnimatedPath = Animated.createAnimatedComponent(Path)

interface Props {
  checked?: boolean
}

const AnimatedCheckbox = (props: Props) => {
  const { checked } = props
  // const [length, setLength] = useState(0);
  // const ref = useRef<typeof AnimatedPath>(null);

  const checkmarkColor = '#000000'
  const highlightColor = '#0000ff'
  const boxOutlineColor = '#bfbfbf'

  const progress = useSharedValue(0)

  useEffect(() => {
    progress.value = withTiming(checked ? 1 : 0, {
      duration: checked ? 300 : 100,
      easing: Easing.linear
    })
  }, [checked])

  const animatedBoxProps = useAnimatedProps(
    () => ({
      stroke: interpolateColor(
        progress.value,
        [0, 1],
        [boxOutlineColor, highlightColor],
        'RGB'
      )
    }),
    [highlightColor, boxOutlineColor]
  )

  const animatedMarkProps = useAnimatedProps(() => ({
    stroke: interpolateColor(
      Easing.bezierFn(0.5, 0, 0.75, 0)(progress.value),
      [0, 1],
      [boxOutlineColor, highlightColor],
      'RGB'
    ),
    opacity: Easing.bezierFn(0.5, 0, 0.75, 0)(progress.value)
  }))

  return (
    <Svg
      viewBox={[-MARGIN, -MARGIN, vWidth + MARGIN, vHeight + MARGIN].join(' ')}
    >
      <AnimatedPath
        d={outlineBoxPath}
        fill="none"
        strokeWidth={8}
        strokeLinejoin="round"
        strokeLinecap="round"
        animatedProps={animatedBoxProps}
      />
      <AnimatedPath
        d={checkMarkPath}
        fill="none"
        strokeWidth={8}
        strokeLinejoin="round"
        strokeLinecap="round"
        animatedProps={animatedMarkProps}
        // strokeDasharray={length}
        // onLayout={() =>
        //   // @ts-ignore
        //   setLength(ref.current === null ? 0 : ref.current.getTotalLength())
        // }
        // // @ts-ignore
        // ref={ref}
      />
    </Svg>
  )
}

export default AnimatedCheckbox
