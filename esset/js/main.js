import PlanGenerator from "./api/plan_generator.js";
import ChatBot from "./api/chat_bot.js";
import { data_generator, data_chatbot } from "./data/api_data.js";

new PlanGenerator(data_generator);
new ChatBot(data_chatbot);
