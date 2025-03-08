const path = require("path"); // Підключення модуля для роботи з шляхами
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); // Плагін для витягування CSS у окремі файли
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin"); // Плагін для мінімізації CSS
const TerserPlugin = require("terser-webpack-plugin"); // Плагін для мінімізації JS
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin"); // Плагін для оптимізації зображень
const HtmlWebpackPlugin = require("html-webpack-plugin"); // Плагін для автоматичного створення HTML-файлу

module.exports = {
    mode: "development", // Режим роботи: 'development' для розробки, 'production' для фінальної збірки
    entry: "./src/index.js", // Вхідний файл JS, з якого починається збірка
    output: {
        filename: "bundle[fullhash].js", // Ім’я файлу результату збірки + хешування для унікальності файлу (для оновлення кешу)
        path: path.resolve(__dirname, "build"), // Шлях до директорії, в яку буде збережено файл
        clean: true, // Очищення папки docs перед кожною збіркою
    },
    devServer: {
        static: "./build", // Вказуємо папку куди Webpack збирає файли
        port: 5555, // Порт, на якому буде працювати сервер
        hot: true, // Включення hot reloading для оновлення сторінки без перезавантаження
        open: true, // Автоматично відкриває браузер після запуску сервера
        watchFiles: ['./src/**/*'], // Які файли вебпак має слідкувати за змінами
    },
    module: {
        rules: [
            {
                test: /\.js$/, // Правило для обробки всіх JS файлів
                exclude: /node_modules/, // Виключаємо з обробки папку node_modules
            },
            {
                test: /\.css$/, // Правило для обробки всіх CSS файлів
                use: [MiniCssExtractPlugin.loader, "css-loader"], // плагіни для витягування та обробки CSS
            },
            {
                test: /\.scss$/, // Додаємо правило для обробки SCSS файлів
                use: [
                    MiniCssExtractPlugin.loader, // Витягуємо CSS в окремий файл
                    "css-loader", // Завантажуємо CSS
                    "sass-loader", // Компілюємо SCSS в CSS
                ],
            },
            {
                test: /\.(png|jpe?g|gif|svg)$/i, // Правило для обробки зображень (png, jpg, jpeg, gif, svg)
                type: "asset", // Webpack автоматично перетворює зображення на модулі, це дає змогу для автоматичного хешування, оптимізація, і можливість інтеграції з іншими частинами коду/проекту
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/index.html", // Вказуємо шаблон для HTML-файлу
            filename: "index.html", // Вказуємо ім’я файлу, який буде створено
        }),
        new MiniCssExtractPlugin({
            filename: "styles.css", // Генерація окремого CSS файлу з усіма стилями
        }),
    ],
    optimization: {
        minimizer: [
            new TerserPlugin({ // Плагін для мінімізації JS
                extractComments: false, // Вимикає генерацію LICENSE.txt при мінімізації JS
            }), 
            new CssMinimizerPlugin(), // Плагін для мінімізації CSS
            new ImageMinimizerPlugin({
                minimizer: {
                    implementation: ImageMinimizerPlugin.imageminGenerate, // Використовуємо бібліотеку imagemin для оптимізації зображень
                    options: {
                    plugins: ["gifsicle", "jpegtran", "optipng", "svgo"], // Плагіни для зменшення розміру зображень
                    },
                },
            }),
        ],
    },
};