import { CssBaseline } from '@material-ui/core';
import { createMuiTheme, createStyles, MuiThemeProvider, withStyles } from '@material-ui/core/styles';
import * as React from 'react';
import { defaultProps } from 'recompose';

// A theme with custom primary and secondary color.
// It's optional.
const theme = createMuiTheme({

});

const globalStyles = createStyles({
  '@global': {
      'html': {
        background: theme.palette.background.default,
        WebkitFontSmoothing: 'antialiased', // Antialiasing.
        MozOsxFontSmoothing: 'grayscale', // Antialiasing.
        height: '100%',
    },
    'body': {
        margin: 0,
        height: '100%',
    },
    '#maincontainer': {
        height: '100%',
    },
  },
});

const GlobalWrapper = withStyles(globalStyles)((props: { children: JSX.Element }) => {
  return props.children;
});

function withRoot(Component: React.ComponentType) {
  function WithRoot(props: object) {
    // MuiThemeProvider makes the theme available down the React tree
    // thanks to React context.
    return (
      <MuiThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <GlobalWrapper>
          <Component {...props} />
        </GlobalWrapper>
      </MuiThemeProvider>
    );
  }

  return WithRoot;
}

export default withRoot;
