import { useRoute } from '@react-navigation/native';
import React, { useState } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  View,
  Text,
  Image,
  TouchableOpacity,
  Switch,
  Button,
} from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
const SECTIONS = [
  {
    header: 'Preferences',
    items: [
      { id: 'darkMode', icon: 'moon', label: 'Dark Mode', type: 'toggle' },
    ],
  },
  {
    header: 'Help',
    items: [
      { id: 'contact', icon: 'mail', label: 'Contact Us', type: 'link' },
    ],
  },
  {
    header: 'Return',
    items: [
      { id: 'profile', icon: 'arrow-left', label: 'Profile', type: 'button' },
    ]
  }
];


export default function Example() {

  // Get token from route
  const route = useRoute();
  const token = route.params.token;

  const [form, setForm] = useState({
    language: 'English',
    darkMode: true,
  });

  return (
    
    
    <SafeAreaView style={{ backgroundColor: '#f6f6f6' }}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Settings</Text>

          <Text style={styles.subtitle}>
            Update to your Preferences
          </Text>
        </View>

        <View style={styles.profile}>
          <Image
            alt=""
            source={{
              uri: 'https://s.hdnux.com/photos/01/00/21/57/16849857/6/rawImage.jpg',
            }}
            style={styles.profileAvatar}
          />

          <Text style={styles.profileName}>Jonathan Husky</Text>

          <Text style={styles.profileEmail}>Jonathan.Husky@uconn.edu</Text>

          <TouchableOpacity
            onPress={() => {
              // handle onPress
            }}>
            <View style={styles.profileAction}>
              <Text style={styles.profileActionText}>Edit Profile</Text>

              <FeatherIcon color="#fff" name="edit" size={16} />
            </View>
          </TouchableOpacity>
          
        </View>

        {SECTIONS.map(({ header, items }) => (
          <View style={styles.section} key={header}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionHeaderText}>{header}</Text>
            </View>
            <View style={styles.sectionBody}>
              {items.map(({ id, label, icon, type, value }, index) => {
                return (
                  <View
                    key={id}
                    style={[
                      styles.rowWrapper,
                      index === 0 && { borderTopWidth: 1 },
                    ]}>
                    <TouchableOpacity
                      onPress={() => {
                        // handle onPress
                      }}>
                      <View style={styles.row}>
                        <FeatherIcon
                          color="#616161"
                          name={icon}
                          style={styles.rowIcon}
                          size={22}
                        />

                        <Text style={styles.rowLabel}>{label}</Text>

                        <View style={styles.rowSpacer} />

                        {type === 'select' && (
                          <Text style={styles.rowValue}>{form[id]}</Text>
                        )}

                        {type === 'toggle' && (
                          <Switch
                            onChange={val => setForm({ ...form, [id]: val })}
                            value={form[id]}
                          />
                        )}

                        {(type === 'select' || type === 'link') && (
                          <FeatherIcon
                            color="#ababab"
                            name="chevron-right"
                            size={22}
                          />
                        )}
                      </View>
                    </TouchableOpacity>
                  </View>
                );
              })}
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 1,
  },
  section: {
    paddingTop: 1,
  },
  sectionHeader: {
    paddingHorizontal: 24,
    paddingVertical: 8,
  },
  sectionHeaderText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0D223F',
    textTransform: 'uppercase',
    letterSpacing: 2,
  },
  sectionBody: {
    borderTopWidth: 10,
    borderBottomWidth: 10,
    borderColor: '#0D223F',
  },
  header: {
    paddingLeft: 25,
    paddingRight: 24,
    marginBottom: 12,
  },
  title: {
    fontSize: 35,
    fontWeight: '700',
    color: '#1d1d1d',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#929292',
  },
  profile: {
    padding: 17,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderTopWidth: 10,
    borderBottomWidth: 10,
    borderColor: '#0D223F',
  },
  profileAvatar: {
    width: 90,
    height: 90,
    borderRadius: 9,
  },
  profileName: {
    marginTop: 12,
    fontSize: 20,
    fontWeight: '600',
    color: '#090909',
  },
  profileEmail: {
    marginTop: 6,
    fontSize: 16,
    fontWeight: '600',
    color: '#0D223F',
  },
  profileAction: {
    marginTop: 12,
    paddingVertical: 10,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0D223F',
    borderRadius: 12,
  },
  profileActionText: {
    marginRight: 10,
    fontSize: 15,
    fontWeight: '600',
    color: '#fff',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingRight: 15,
    height: 50,
  },
  rowWrapper: {
    paddingLeft: 20,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderColor: '#e3e3e3',
  },
  rowIcon: {
    marginRight: 17,
  },
  rowLabel: {
    fontSize: 17,
    fontWeight: '600',
    color: '#000',
  },
  rowValue: {
    fontSize: 17,
    color: '#616161',
    marginRight: 4,
  },
  rowSpacer: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
});