import { Profile } from "passport";
import { OAuthProfile } from "../auth.service";

export function extractFieldsFromOAuthProfile(profile: Profile): OAuthProfile {
  const { name } = profile;
  const fullName = [name.givenName, name.middleName, name.familyName]
    .filter(Boolean)
    .join(" ");

  return {
    fullName,
    email: profile.emails[0].value,
    profileUri: null,
  };
}
