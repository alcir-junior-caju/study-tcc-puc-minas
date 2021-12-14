interface AvatarFaker {
  avatarUrl: string;
  avatar: string;
  id: string;
}

export default function checkImageFaker({
  avatarUrl,
  avatar,
  id
}: AvatarFaker): String {
  const imageFaker = avatarUrl.includes('pravatar');

  if (imageFaker) return `${avatar}?u=${id}`;

  return avatarUrl;
}
