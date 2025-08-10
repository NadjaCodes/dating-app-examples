import {SafeAreaView, StyleSheet, View} from 'react-native';
import {ThemedText} from '@/components/ThemedText';
import {ThemedView} from '@/components/ThemedView';
import {IconSymbol} from '@/components/ui/IconSymbol';
import {Link} from "expo-router";
import InfoMessage from "@/components/InfoMessage";
import SafeView from '@/components/SafeView'

export default function Profile() {
  
  return (
    <SafeView>
          <ThemedView style={styles.titleContainer}>
            <ThemedText type="title">Profile</ThemedText>
          </ThemedView>
          <ThemedView style={{flexDirection: 'row'}}>
            <Link href={"/profile/profilePictures"}>
              <View style={{position: 'relative'}}>
                <IconSymbol size={128} name="person.circle.fill" color="#D3D3D3" />
                <View style={{
                  position: 'absolute',
                  bottom: 15,
                  right: 15,
                  backgroundColor: '#ad7aff',
                  borderRadius: 12,
                  padding: 4
                }}>
                  <IconSymbol size={16} name="plus" color="#fff" />
                </View>
              </View>
            </Link>
            <ThemedText type={"subtitle"}>Katharina, 27</ThemedText>
          </ThemedView>
          <InfoMessage text={'Please answer 3 prompts - your new match is excited to learn about you!'}/>
          <ThemedView style={styles.view}>
            <IconSymbol size={32} name="questionmark.circle.fill" color="#ad7aff" />
            <ThemedText type="subtitle">Answer questions</ThemedText>
          </ThemedView>
          <ThemedView style={styles.view}>
            <IconSymbol size={32} name="mic.circle.fill" color="#ad7aff" />
            <ThemedText type="subtitle">Add a 15s voice memo introduction</ThemedText>
          </ThemedView>
          <ThemedView style={styles.view}>
            <IconSymbol size={32} name="video.badge.plus.fill" color="#ad7aff" />
            <ThemedText type="subtitle">Upload a video & add subtitles</ThemedText>
          </ThemedView>
    </SafeView>
  );
}

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    
  },
  view: {
    flexDirection: 'row',
    margin: 10,
    gap: 8
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  
});
