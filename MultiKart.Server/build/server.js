"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(body_parser_1.default.json({ limit: '30mb' }));
app.use(body_parser_1.default.urlencoded({ limit: '30mb', extended: true }));
app.use((0, cors_1.default)()); // enable CORS - Cross Origin Resource Sharing
const PORT = (_a = process.env.PORT) !== null && _a !== void 0 ? _a : 3000;
const MONGODB = (_b = process.env.MONGODB_ATLAS_URL) !== null && _b !== void 0 ? _b : '';
const options = { useNewUrlParser: true, useUnifiedTopology: true };
mongoose_1.default.connect(MONGODB)
    .then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
    .catch((error) => console.error(error.message));
