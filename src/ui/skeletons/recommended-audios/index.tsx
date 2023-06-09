import {FC} from 'react';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

interface Props {}

const RecommendedAudiosSkeleton: FC<Props> = props => {
  return (
    <SkeletonPlaceholder borderRadius={4}>
      <>
        <SkeletonPlaceholder.Item
          width={120}
          height={20}
          marginVertical={10}
          marginLeft={5}
        />
        <SkeletonPlaceholder.Item
          flexDirection="row"
          alignItems="center"
          gap={10}
          marginLeft={5}>
          <SkeletonPlaceholder.Item width={'100%'} height={350} />
        </SkeletonPlaceholder.Item>
      </>
    </SkeletonPlaceholder>
  );
};

export default RecommendedAudiosSkeleton;
