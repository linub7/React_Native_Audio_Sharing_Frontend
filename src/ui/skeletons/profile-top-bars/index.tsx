import {FC} from 'react';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

interface Props {}

const ProfileTopBarsSkeleton: FC<Props> = props => {
  return (
    <SkeletonPlaceholder borderRadius={4}>
      <SkeletonPlaceholder.Item gap={10} marginLeft={5} marginBottom={40}>
        <SkeletonPlaceholder.Item width={'100%'} height={50} />
        <SkeletonPlaceholder.Item width={'100%'} height={50} />
        <SkeletonPlaceholder.Item width={'100%'} height={50} />
        <SkeletonPlaceholder.Item width={'100%'} height={50} />
        <SkeletonPlaceholder.Item width={'100%'} height={50} />
        <SkeletonPlaceholder.Item width={'100%'} height={50} />
        <SkeletonPlaceholder.Item width={'100%'} height={50} />
      </SkeletonPlaceholder.Item>
    </SkeletonPlaceholder>
  );
};

export default ProfileTopBarsSkeleton;
