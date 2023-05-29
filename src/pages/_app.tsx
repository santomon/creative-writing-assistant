import { type AppType } from "next/app";
import { api } from "~/utils/api";
import "~/styles/globals.css";
import {ClerkProvider} from "@clerk/nextjs";
import {ThemeProvider} from "@material-tailwind/react";

const MyApp: AppType = ({ Component, pageProps }) => {


    return (
        <ThemeProvider>
            <ClerkProvider {...pageProps}>
                <Component {...pageProps} />
            </ClerkProvider>
        </ThemeProvider>
);
};

export default api.withTRPC(MyApp);
