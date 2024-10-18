"use client";

import { selectAiChatMessages } from "@/lib/features/ai-chats/ai-chat-Slice";
import { useAppSelector } from "@/lib/hooks";
import { Document, Page, StyleSheet, Text, View } from "@react-pdf/renderer";

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "#E4E4E4",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
});

// Create Document Component
export const MyDocument = () => {
  const chatsToRender = useAppSelector(selectAiChatMessages);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {chatsToRender.map((chat, index) => {
          return (
            <div className="mb-5 mt-5" key={index}>
              <View style={styles.section}>
                {/* can also display username istead of 'user' */}
                <Text>{chat.role == "ai" ? "AI" : "User"}</Text>
              </View>
              <View style={styles.section}>
                <Text>{chat.message}</Text>
              </View>
            </div>
          );
        })}
      </Page>
    </Document>
  );
};


