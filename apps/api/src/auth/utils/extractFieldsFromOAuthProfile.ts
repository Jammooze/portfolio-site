import { Profile } from "passport";
import { OAuthProfile } from "../auth.service";

export function extractFieldsFromOAuthProfile(profile: Profile): OAuthProfile {
  return {
    name: {
      givenName: profile.name.givenName,
      middleName: profile.name.middleName,
      familyName: profile.name.familyName,
    },
    email: profile.emails[0].value,
    profileUri: null,
  };
}
