import * as React from 'react'
import { Box, Text, Center, VStack } from 'native-base'
import ThemeToggle from '../components/theme-toggle'

export default function MainScreen() {
  return (
    <Center
      _light={{ bg: 'blueGray.50' }}
      _dark={{ bg: 'blueGray.900' }}
      px={4}
      flex={1}
    >
      <VStack space={5} alignItems="center">
        <Box>
          <Text>Hello</Text>
        </Box>
        <ThemeToggle />
      </VStack>
    </Center>
  )
}
