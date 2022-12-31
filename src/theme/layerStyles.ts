export const layerStyles = {
  padded: {
    '2-3': {
      px: 2,
      py: 3
    },
    '4-2': {
      px: 4,
      py: 2
    }
  },
  bg: {
    main: {
      bg: 'white',
      _dark: {
        bg: 'blackAlpha.700',
      }
    }
  },
  border: {
    borderColor: 'blackAlpha.400',
    borderWidth: 1,
    borderStyle: 'solid',
    _dark: {
      borderColor: 'whiteAlpha.300'
    },

    right: {
      borderRightColor: 'blackAlpha.400',
      borderRightWidth: 1,
      borderRightStyle: 'solid',
      _dark: {
        borderRightColor: 'whiteAlpha.300'
      },
    },
    left: {
      borderLeftColor: 'blackAlpha.400',
      borderLeftWidth: 1,
      borderLeftStyle: 'solid',
      _dark: {
        borderLeftColor: 'whiteAlpha.300'
      },
    },
    top: {
      borderTopColor: 'blackAlpha.400',
      borderTopWidth: 1,
      borderTopStyle: 'solid',
      _dark: {
        borderTopColor: 'whiteAlpha.300'
      },
    },
    bottom: {
      borderBottomColor: 'blackAlpha.400',
      borderBottomWidth: 1,
      borderBottomStyle: 'solid',
      _dark: {
        borderBottomColor: 'whiteAlpha.300'
      },
    }
  }
}
