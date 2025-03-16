
import React, { useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { Card, CardContent, Typography, Chip, Box, Avatar, Tooltip, AvatarGroup } from '@mui/material';
import { makeStyles } from '@mui/styles';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

const useStyles = makeStyles((theme) => ({
  card: {
    marginBottom: 16,
    backgroundColor: 'white',
    transition: 'all 0.2s ease-in-out',
    '&:hover': {
      boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.1)'
    }
  },
  cardDragging: {
    transform: 'rotate(1deg)'
  },
  cardTitle: {
    fontSize: '0.95rem',
    fontWeight: 500,
    color: '#111827'
  },
  cardContent: {
    padding: '12px 16px !important',
    '&:last-child': {
      paddingBottom: '12px !important'
    }
  },
  cardDescription: {
    marginTop: 8,
    marginBottom: 12
  },
  metaContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 8
  },
  metaInfo: {
    display: 'flex',
    alignItems: 'center',
    color: '#6B7280',
    fontSize: '0.75rem'
  },
  metaIcon: {
    fontSize: '0.9rem',
    marginRight: 4
  },
  labelsContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 4,
    marginTop: 8
  },
  label: {
    fontSize: '0.7rem',
    height: '20px'
  },
  cardNumber: {
    color: '#6B7280',
    fontSize: '0.75rem',
    marginBottom: 4
  },
  cardCategory: {
    color: '#6B7280',
    fontSize: '0.75rem',
    marginBottom: 8
  },
  statusChip: {
    height: 24,
    fontSize: '0.65rem'
  },
  teamMembersContainer: {
    marginTop: 8
  },
  dueDate: {
    display: 'flex',
    alignItems: 'center',
    color: '#6B7280',
    fontSize: '0.75rem',
    marginTop: 8
  },
  dateText: {
    marginLeft: 4
  },
  metaRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8
  },
  avatarGroup: {
    '& .MuiAvatar-root': {
      width: 24,
      height: 24,
      fontSize: '0.75rem',
      border: '2px solid white'
    }
  },
  membersList: {
    padding: '8px',
    '& .MuiTypography-root': {
      fontSize: '12px',
      padding: '4px 0'
    }
  },
  assignedLabel: {
    color: '#6B7280',
    fontSize: '0.7rem',
    marginRight: 4
  }
}));

/**
 * @param {Object} props
 * @param {import('./types').CardType} props.card
 * @param {number} props.index
 * @returns {JSX.Element}
 */
const KanbanCard = ({ card, index }) => {
  const classes = useStyles();
  const [showTeamMembers, setShowTeamMembers] = useState(false);

  // Team members (sample data)
  const teamMembers = card.teamMembers || [
    { id: 1, name: 'John Doe', avatar: 'J' },
    { id: 2, name: 'Suresh Kumar', avatar: 'S' }
  ];

  // If card has a specific status field, use that, otherwise derive from label or set default
  const getStatusDetails = () => {
    if (card.status) {
      switch (card.status.toLowerCase()) {
        case 'approval pending':
          return { label: 'Approval Pending', color: '#FFF7ED', textColor: '#EA580C' };
        case 'assigned':
          return { label: 'Assigned', color: '#EFF6FF', textColor: '#0284C7' };
        case 'unassigned':
          return { label: 'Unassigned', color: '#F3F4F6', textColor: '#6B7280' };
        case 'overdue':
          return { label: 'Overdue', color: '#FEF2F2', textColor: '#DC2626' };
        case 'rejected':
          return { label: 'Rejected', color: '#FEF2F2', textColor: '#DC2626' };
        case 'closed':
          return { label: 'Closed', color: '#ECFDF5', textColor: '#059669' };
        case 'ongoing':
          return { label: 'Ongoing', color: '#EFF6FF', textColor: '#0284C7' };
        default:
          return { label: card.status, color: '#F3F4F6', textColor: '#6B7280' };
      }
    }
    return { label: 'New', color: '#F3F4F6', textColor: '#6B7280' };
  };

  const { label, color, textColor } = getStatusDetails();

  return (
    <Draggable draggableId={card.id} index={index}>
      {(provided, snapshot) => (
        <Card
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`${classes.card} ${snapshot.isDragging ? classes.cardDragging : ''}`}
          elevation={snapshot.isDragging ? 3 : 1}
        >
          <CardContent className={classes.cardContent}>
            <Typography className={classes.cardNumber}>
              Action number: {card.actionNumber || 'AT-24111-004'}
            </Typography>
            
            <Typography variant="h6" component="div" className={classes.cardTitle}>
              {card.title}
            </Typography>
            
            <Typography className={classes.cardCategory}>
              Category: {card.category || 'Plumbing'}
            </Typography>
            
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography className={classes.assignedLabel}>
                  {card.reviewer ? 'Reviewer:' : 'Approver:'}
                </Typography>
                <Typography sx={{ fontSize: '0.75rem' }}>
                  {card.reviewer || card.approver || 'Amit Kumar'}
                </Typography>
              </Box>
              
              <Chip 
                label={label}
                size="small"
                className={classes.statusChip}
                style={{ backgroundColor: color, color: textColor }}
              />
            </Box>
            
            <Box className={classes.metaRow}>
              <Box className={classes.dueDate}>
                <AccessTimeIcon fontSize="small" className={classes.metaIcon} />
                <span className={classes.dateText}>Due date: {card.dueDate || '24-Nov-2024'}</span>
              </Box>
              
              <AvatarGroup 
                max={3}
                className={classes.avatarGroup}
                onMouseEnter={() => setShowTeamMembers(true)}
                onMouseLeave={() => setShowTeamMembers(false)}
              >
                {teamMembers.map((member) => (
                  <Tooltip
                    key={member.id}
                    title={
                      <div className={classes.membersList}>
                        <Typography>{member.name}</Typography>
                      </div>
                    }
                    arrow
                    open={showTeamMembers}
                    placement="top"
                  >
                    <Avatar>{member.avatar}</Avatar>
                  </Tooltip>
                ))}
              </AvatarGroup>
            </Box>
          </CardContent>
        </Card>
      )}
    </Draggable>
  );
};

export default KanbanCard;
