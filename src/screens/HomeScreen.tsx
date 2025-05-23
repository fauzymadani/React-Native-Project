import React, { useContext } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions,
} from 'react-native';
import { ThemeContext } from '../contexts/ThemeContexts';

const { width } = Dimensions.get('window');

const boards = [
  { id: 'b', title: 'Random', desc: 'The /b/ board is the random board', threads: 1223, posts: 45890 },
  { id: 'pol', title: 'Politically Incorrect', desc: 'Discuss politics', threads: 540, posts: 23000 },
  { id: 'g', title: 'Technology', desc: 'Tech talk & programming', threads: 650, posts: 14500 },
  { id: 'tv', title: 'Television & Film', desc: 'Discuss TV shows & movies', threads: 430, posts: 11200 },
  { id: 'a', title: 'Anime & Manga', desc: 'For the otakus', threads: 780, posts: 19800 },
  { id: 'v', title: 'Video Games', desc: 'Game talk', threads: 1200, posts: 35000 },
];

const HomeScreen = ({ route, navigation }: any) => {
  const { username } = route.params;
  const { theme, toggleTheme } = useContext(ThemeContext);
  const styles = getStyles(theme);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Main Header (site title + user greeting) */}
      <View style={styles.headerBar}>
        <Text style={styles.siteTitle}>Catalog, Built with love and sprinkles of AI. ~ by Fauzy</Text>
        <Text style={styles.welcomeText}>Welcome, {username}</Text>
      </View>

      {/* Top header bar above boards (styled like footer) */}
      <View style={styles.topHeader}>
        <Text style={styles.topHeaderText}>Boards / Categories (busy board overview)</Text>
        <Text style={styles.topHeaderSubtext}>
          Threads: 7,301 | Posts: 203,690 | Active Users: 1,284
        </Text>
      </View>

      {/* Boards grid */}
      <View style={styles.boardGrid}>
        {boards.map((board) => (
          <TouchableOpacity
            key={board.id}
            style={styles.boardBox}
            onPress={() => navigation.navigate('Board', { boardId: board.id })}
          >
            <Text style={styles.boardTitle}>/{board.id}/ - {board.title}</Text>
            <Text style={styles.boardDesc}>{board.desc}</Text>
            <View style={styles.boardStats}>
              <Text style={styles.boardStatText}>🧵 {board.threads} threads</Text>
              <Text style={styles.boardStatText}>💬 {board.posts} posts</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      {/* Action links */}
      <View style={styles.linksContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('Blog')}>
          <Text style={styles.linkText}>[ View products ]</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={toggleTheme}>
          <Text style={styles.linkText}>
            [ Switch to {theme === 'dark' ? 'Light' : 'Dark'} Mode ]
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.replace('Login')}>
          <Text style={styles.linkText}>[ Logout ]</Text>
        </TouchableOpacity>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>© 2003 4chan.orh</Text>
      </View>
    </ScrollView>
  );
};

const getStyles = (theme: string) =>
  StyleSheet.create({
    container: {
      flexGrow: 1,
      backgroundColor: theme === 'dark' ? '#1a1a1a' : '#fff',
      paddingVertical: 20,
      paddingHorizontal: 12,
      alignItems: 'center',
    },
    headerBar: {
      width: '100%',
      maxWidth: 720,
      marginBottom: 16,
      borderBottomWidth: 1,
      borderBottomColor: theme === 'dark' ? '#555' : '#aaa',
      paddingBottom: 12,
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    siteTitle: {
      fontFamily: 'monospace',
      fontSize: 28,
      fontWeight: 'bold',
      color: theme === 'dark' ? '#0f0' : '#060',
      textShadowColor: theme === 'dark' ? '#040' : '#aaf',
      textShadowOffset: { width: 1, height: 1 },
      textShadowRadius: 1,
    },
    welcomeText: {
      fontFamily: 'monospace',
      fontSize: 16,
      color: theme === 'dark' ? '#ccc' : '#333',
      alignSelf: 'center',
    },
    topHeader: {
      width: '100%',
      maxWidth: 720,
      backgroundColor: theme === 'dark' ? '#222' : '#ddd',
      paddingVertical: 10,
      paddingHorizontal: 16,
      borderTopWidth: 2,
      borderTopColor: theme === 'dark' ? '#555' : '#aaa',
      borderBottomWidth: 2,
      borderBottomColor: theme === 'dark' ? '#555' : '#aaa',
      marginBottom: 16,
    },
    topHeaderText: {
      fontFamily: 'monospace',
      fontSize: 16,
      fontWeight: 'bold',
      color: theme === 'dark' ? '#0f0' : '#060',
      marginBottom: 4,
    },
    topHeaderSubtext: {
      fontFamily: 'monospace',
      fontSize: 12,
      color: theme === 'dark' ? '#aaa' : '#444',
    },
    boardGrid: {
      width: '100%',
      maxWidth: 720,
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'flex-start',
      gap: 8,
    },
    boardBox: {
      backgroundColor: theme === 'dark' ? '#222' : '#eee',
      borderColor: theme === 'dark' ? '#444' : '#aaa',
      borderWidth: 1,
      width: (width > 720 ? 180 : (width / 2) - 24),
      minHeight: 120,
      margin: 4,
      padding: 12,
      borderRadius: 4,
      shadowColor: theme === 'dark' ? '#000' : '#999',
      shadowOffset: { width: 1, height: 1 },
      shadowOpacity: 0.2,
      shadowRadius: 2,
    },
    boardTitle: {
      fontFamily: 'monospace',
      fontSize: 14,
      fontWeight: 'bold',
      color: theme === 'dark' ? '#0f0' : '#060',
      marginBottom: 6,
    },
    boardDesc: {
      fontFamily: 'monospace',
      fontSize: 11,
      color: theme === 'dark' ? '#ccc' : '#333',
      marginBottom: 8,
    },
    boardStats: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    boardStatText: {
      fontFamily: 'monospace',
      fontSize: 10,
      color: theme === 'dark' ? '#999' : '#666',
    },
    linksContainer: {
      marginTop: 24,
      width: '100%',
      maxWidth: 720,
      borderTopWidth: 1,
      borderTopColor: theme === 'dark' ? '#555' : '#aaa',
      paddingTop: 12,
      flexDirection: 'row',
      justifyContent: 'flex-start',
      gap: 16,
      flexWrap: 'wrap',
    },
    linkText: {
      fontFamily: 'monospace',
      fontSize: 14,
      color: '#0000ee',
      textDecorationLine: 'underline',
      marginRight: 20,
    },
    footer: {
      marginTop: 36,
      width: '100%',
      maxWidth: 720,
      borderTopWidth: 1,
      borderTopColor: theme === 'dark' ? '#555' : '#aaa',
      paddingVertical: 12,
      alignItems: 'center',
    },
    footerText: {
      fontFamily: 'monospace',
      fontSize: 12,
      color: theme === 'dark' ? '#666' : '#999',
    },
  });

export default HomeScreen;
