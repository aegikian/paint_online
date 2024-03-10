import path from "path";
import HtmlWebpackPlugin from "html-webpack-plugin";
import webpack, { DefinePlugin } from "webpack";
import "webpack-dev-server";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import ReactRefreshTypescript from "react-refresh-typescript";

type Mode = "production" | "development";
interface EnvVar {
  mode: Mode;
  port: number;
}
const entry = {
  hw: path.resolve(__dirname, "src", "index.tsx"),
  main: path.resolve(__dirname, "src", "index.tsx"),
};
const output = {
  path: path.resolve(__dirname, "build"),
  filename: "[name].[contenthash].js",
  clean: true,
};
const plugins = [
  new HtmlWebpackPlugin({
    template: path.resolve(__dirname, "public", "index.html"),
  }),
  new MiniCssExtractPlugin({
    filename: "css/[name].[contenthash:8].css",
    chunkFilename: "css/[name].[contenthash:8].css",
  }),
  new DefinePlugin({}),
];
const rules = [
  {
    test: /\.s[ac]ss$/i,
    use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
  },
  {
    test: /\.tsx?$/,
    exclude: /node_modules/,
    use: {
      loader: "babel-loader",
      options: {
        presets: ["@babel/preset-env"],
      },
    },
  },
  // {
  //   test: /\.tsx?$/,
  //   use: [
  //     {
  //       loader: "ts-loader",
  //       options: {
  //         transpileOnly: true,
  //         getCustomTransformers: () => ({
  //           before: [ReactRefreshTypescript()]
  //         })
  //       },
  //     },
  //   ],
  //   exclude: /node_modules/,
  // },
];
const extensions = [".tsx", ".ts", ".js", ".css", ".scss"];

export default <T extends EnvVar>(env: T) => {
  const isDev = env.mode === "development";
  const config: webpack.Configuration = {
    mode: env.mode,
    entry: entry,
    output: output,
    plugins: plugins,
    module: {
      rules: rules,
    },
    resolve: {
      extensions: extensions,
      alias: {
        "@": path.resolve(__dirname, "src"),
      },
    },
    devtool: isDev ? "inline-source-map" : false,
    devServer: isDev
      ? {
          port: env.port || 3000,
          open: false,
          historyApiFallback: true,
          hot: true,
        }
      : undefined,
  };
  return config;
};
