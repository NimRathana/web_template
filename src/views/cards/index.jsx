// MUI Imports
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Divider from '@mui/material/Divider';

const CardFacebook = () => {
  return (
    <Card 
      sx={{ 
        overflow: 'hidden',
      }}
    >
      {/* Header - User Info + Facebook Logo */}
      <CardContent sx={{ pb: 1 }}>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <Avatar 
              src="/images/avatars/1.png" 
              sx={{ width: 48, height: 48, marginRight: 3 }}
            />
            <div>
              <Typography variant="subtitle1" fontWeight={600} sx={{ lineHeight: 1.2 }}>
                Eugene Clarke
              </Typography>
              <Typography variant="caption" color="text.secondary">
                2h • 🌍 Public
              </Typography>
            </div>
          </div>

          <div className="flex items-center gap-1 text-[#1877F2]">
            <i className="ri-facebook-fill text-3xl" />
            <IconButton size="small" sx={{ color: 'text.secondary' }}>
              <i className="ri-more-fill text-2xl" />
            </IconButton>
          </div>
        </div>

        {/* Post Text */}
        <Typography 
          variant="body1" 
          sx={{ 
            my: 3, 
            lineHeight: 1.5,
            fontSize: '1.02rem',
            color: 'text.primary'
          }}
        >
          You've read about the importance of being courageous, rebellious and imaginative. 
          These are all vital ingredients in an effective leader.
        </Typography>

        {/* Fake Image / Media Area (makes it way more beautiful) */}
        <div className="rounded-2xl overflow-hidden bg-gray-100 mb-4 -mx-4">
          <img 
            src="https://picsum.photos/id/1015/600/340" 
            alt="Post media"
            className="w-full h-auto object-cover"
            style={{ maxHeight: '340px' }}
          />
        </div>

        {/* Reaction Stats */}
        <div className="flex items-center justify-between text-sm mb-2">
          <div className="flex items-center gap-1">
            <div className="flex -space-x-1">
              <span className="text-lg">👍</span>
              <span className="text-lg">❤️</span>
            </div>
            <Typography variant="body2" color="text.secondary">
              2.5K
            </Typography>
          </div>

          <div className="flex items-center gap-4">
            <Typography variant="body2">124 Comments</Typography>
            <Typography variant="body2">89 Shares</Typography>
          </div>
        </div>

        <Divider sx={{ my: 1 }} />

        {/* Action Buttons - Like, Comment, Share */}
        <div className="flex justify-around pt-1">
          <IconButton color="inherit" sx={{ flex: 1, borderRadius: 2, gap: 1 }}>
            <i className="ri-thumb-up-line text-2xl" />
            <Typography variant="body2" fontWeight={500}>Like</Typography>
          </IconButton>

          <IconButton color="inherit" sx={{ flex: 1, borderRadius: 2, gap: 1 }}>
            <i className="ri-chat-3-line text-2xl" />
            <Typography variant="body2" fontWeight={500}>Comment</Typography>
          </IconButton>

          <IconButton color="inherit" sx={{ flex: 1, borderRadius: 2, gap: 1 }}>
            <i className="ri-share-line text-2xl" />
            <Typography variant="body2" fontWeight={500}>Share</Typography>
          </IconButton>
        </div>
      </CardContent>
    </Card>
  );
};

export default CardFacebook;