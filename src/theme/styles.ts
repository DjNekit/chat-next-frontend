const resetAutoFillStyles = {
  WebkitTextFillColor: 'white !important',
  WebkitBoxShadow: '0 0 0px 1000px black inset !important'
}

export const styles = {
  global: {
    fonts: {
      heading: `'Open Sans', sans-serif`,
      body: `'Raleway', sans-serif`,
    },
    body: {

    },
    a: {
      _hover: {
        textDecoration: 'none !important',
      },
    },

    // remove autofill shit hack
    input: {
      _autofill: {
        _focus: resetAutoFillStyles,
        _active: resetAutoFillStyles,
        _hover: resetAutoFillStyles,
        ...resetAutoFillStyles
      },
    }
  }
}
