import { IPropsDefaultLayout } from "./Default.props";
import Head from "next/head";
import { enumPaths, typesPath } from "../../models";

export const Default = ({
  children,
  path,
}: IPropsDefaultLayout): JSX.Element => {
  return (
    <>
      <Head>
        <title>{enumPaths[path as typesPath]}</title>
      </Head>
      {children}
    </>
  );
};
