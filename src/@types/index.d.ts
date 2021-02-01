interface Nweet {
  text: string;
  createdAt: number;
  creatorId: string;
  attachmentUrl: string;
}

interface NweetObj extends Nweet {
  id: string;
}

interface Args {
  displayName?: string | null;
  photoURL?: string | null;
}

interface User {
  uid: string;
  displayName: string | null;
  updateProfile: (args: Args) => Promise<void>;
}
