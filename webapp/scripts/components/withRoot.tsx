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

// import { CssBaseline } from '@material-ui/core';
// import { MuiThemeProvider } from '@material-ui/core/styles';
// import withStyles from '@material-ui/core/styles/withStyles';
// import * as React from 'react';
// import JssProvider from 'react-jss/lib/JssProvider';
// import { wrapDisplayName } from 'recompose';
// // import createContext from '../styles/createContext';

// // Apply some reset
// const decorate = withStyles((theme) => ({
//   '@global': {
//     'html': {
//       background: theme.palette.background.default,
//       WebkitFontSmoothing: 'antialiased', // Antialiasing.
//       MozOsxFontSmoothing: 'grayscale', // Antialiasing.
//       height: '100%',
//     },
//     'body': {
//       margin: 0,
//       height: '100%',
//     },
//     '#maincontainer': {
//       height: '100%',
//     },
//   },
// }));

// const AppWrapper = decorate<{ children: JSX.Element }>((props) => props.children);

// // const context = createContext();

// function withRoot(ComponentToRender: React.ComponentType) {
//   class WithRoot extends React.Component {
//     componentDidMount() {
//       // Remove the server-side injected CSS.
//       const jssStyles = document.querySelector('#jss-server-side');
//       if (jssStyles && jssStyles.parentNode) {
//         jssStyles.parentNode.removeChild(jssStyles);
//       }
//     }

//     render() {
//       return (
//         <JssProvider registry={context.sheetsRegistry} jss={context.jss}>
//           <MuiThemeProvider theme={context.theme} sheetsManager={context.sheetsManager}>
//             <CssBaseline />
//             <AppWrapper>
//               <ComponentToRender />
//             </AppWrapper>
//           </MuiThemeProvider>
//         </JssProvider>
//       );
//     }
//   }

//   if (process.env.NODE_ENV !== 'production') {
//     (WithRoot as any).displayName = wrapDisplayName(ComponentToRender, 'withRoot');
//   }

//   return WithRoot;
// }

// export default withRoot;
