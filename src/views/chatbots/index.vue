<template>
  <section class="msger">
    <header class="msger-header">
      <div class="msger-header-title">
        <i class="fas fa-comment-alt"></i> ChatBot Académico
      </div>
      <div class="msger-header-options">
        <span><i class="fa fa-cog" aria-hidden="true"></i></span>
      </div>
    </header>

    <main class="msger-chat">
      <div
        v-for="(message, index) in messages"
        :key="index"
        :class="['msg', message.side + '-msg']"
      >
        <div class="msg-img">
          <img :src="message.img" />
        </div>
        <div class="msg-bubble">
          <div class="msg-info">
            <div class="msg-info-name">{{ message.name }}</div>
            <div class="msg-info-time">{{ message.time }}</div>
          </div>
          <div v-if="message.text" class="msg-text">{{ message.text }}</div>
          <div v-if="message.options" class="msg-options">
            <p class="msg-subtitle">Opciones disponibles:</p>
            <div
              v-for="(option, idx) in message.options"
              :key="idx"
              class="msg-option-item"
            >
              {{ option }}
            </div>
          </div>
        </div>
      </div>
    </main>

    <form class="msger-inputarea" @submit.prevent="handleSubmit">
      <input
        v-model="userInput"
        type="text"
        class="msger-input"
        placeholder="Ingresa tu mensaje..."
      />
      <button type="submit" class="msger-send-btn">
        <i class="fa fa-paper-plane-o" aria-hidden="true"></i>
      </button>
    </form>
  </section>
</template>

<script>
import ChatbotService from "../../services/chatbot.service";

export default {
  name: "ChatBot",
  data() {
    return {
      userInput: "",
      messages: [
        {
          name: "BOT",
          img: "/img/chatbot.png",
          side: "left",
          text: "Hola, ¡bienvenido a Chat Académico! Envíame un mensaje.. 😄",
          time: this.formatDate(new Date()),
        },
      ],
    };
  },
  methods: {
    async handleSubmit() {
      try {
        const response = await ChatbotService.getChat("/botman", {
          message: this.userInput,
        });

        if (response.status === 200) {
          this.appendMessage("Tú", "/img/chat.png", "right", this.userInput);

          const reply = response.data.reply;

          if (this.isOptionMessage(reply)) {
            const options = this.parseOptions(reply);
            this.appendMessage(
              "BOT",
              "/img/chatbot.png",
              "left",
              "¡Hola! ¿En qué puedo ayudarte?",
              options
            );
          } else {
            this.appendMessage("BOT", "/img/chatbot.png", "left", reply);
          }

          this.userInput = "";
        }
      } catch (error) {
        console.error("Error al obtener la respuesta del bot:", error);
        this.appendMessage(
          "BOT",
          "/img/chatbot.png",
          "left",
          "Ocurrió un error al comunicarse con el chatbot. Inténtalo de nuevo más tarde."
        );
      }
    },
    isOptionMessage(reply) {
      return reply.includes("1️⃣") || reply.includes("Opciones disponibles");
    },
    parseOptions(reply) {
      return reply
        .split("\n")
        .filter((line) => /^\d/.test(line.trim()));
    },
    appendMessage(name, img, side, text, options = null) {
      this.messages.push({
        name,
        img,
        side,
        text,
        options,
        time: this.formatDate(new Date()),
      });
      this.scrollToBottom();
    },
    formatDate(date) {
      const h = `0${date.getHours()}`.slice(-2);
      const m = `0${date.getMinutes()}`.slice(-2);
      return `${h}:${m}`;
    },
    scrollToBottom() {
      const chatContainer = this.$el.querySelector(".msger-chat");
      chatContainer.scrollTop = chatContainer.scrollHeight;
    },
  },
};
</script>

<style lang="css" scoped>
.msger {
  display: flex;
  flex-flow: column wrap;
  justify-content: space-between;
  width: 100%;
  height: calc(100% - 50px);
  border: var(--border);
  border-radius: 5px;
  background: #fff;
  box-shadow: 0 15px 15px -5px rgba(0, 0, 0, 0.2);
}

.msger-header {
  display: flex;
  justify-content: space-between;
  padding: 10px;
  border-bottom: var(--border);
  background: #eee;
  color: #666;
}

.msger-chat {
  flex: 1;
  overflow-y: auto;
  padding: 10px;
}

.msger-chat::-webkit-scrollbar {
  width: 6px;
}
.msger-chat::-webkit-scrollbar-track {
  background: #ddd;
}
.msger-chat::-webkit-scrollbar-thumb {
  background: #bdbdbd;
}
.msg {
  display: flex;
  align-items: flex-end;
  margin-bottom: 10px;
}
.msg:last-of-type {
  margin: 0;
}
.msg-img {
  width: 55px;
  height: 55px;
  margin-right: 10px;
  border-radius: 50%;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #f0eeee;
}

.msg-img img {
  width: 70%;
  height: 70%;
  object-fit: contain;
}
.msg-bubble {
  max-width: 450px;
  padding: 15px;
  border-radius: 15px;
  background: #ececec;
}
.msg-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}
.msg-info-name {
  margin-right: 10px;
  font-weight: bold;
}
.msg-info-time {
  font-size: 0.85em;
}

.left-msg .msg-bubble {
  border-bottom-left-radius: 0;
}

.right-msg {
  flex-direction: row-reverse;
}
.right-msg .msg-bubble {
  background: #9d4144;
  color: #fff;
  border-bottom-right-radius: 0;
}
.right-msg .msg-img {
  margin: 0 0 0 10px;
}

.msger-inputarea {
  display: flex;
  padding: 10px;
  border-top: var(--border);
  background: #eee;
}
.msger-inputarea * {
  padding: 10px;
  border: none;
  border-radius: 3px;
  font-size: 1em;
}
.msger-input {
  flex: 1;
  background: #ddd;
}
.msger-send-btn {
  margin-left: 10px;
  background: #9e0207;
  color: #fff;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.23s;
}
.msger-send-btn:hover {
  background: #9e0207;
}

.msger-chat {
  background-color: #fcfcfe;
}

.msg-options {
  margin-top: 10px;
  padding: 10px;
  border-radius: 10px;
  background-color: #f9f9f9;
}
.msg-subtitle {
  font-weight: bold;
  margin-bottom: 10px;
}
.msg-option-item {
  margin: 5px 0;
  padding: 10px;
  background: #ececec;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s ease;
}
.msg-option-item:hover {
  background: #ddd;
}
</style>
