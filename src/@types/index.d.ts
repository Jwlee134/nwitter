interface Nweet {
  text: string;
  createdAt: number;
  creatorId: string;
}

interface NweetObj extends Nweet {
  id: string;
}

interface User {
  uid: string;
  displayName: string;
  email: string;
}
