USE [FollowMe]
GO

/****** Object:  Table [dbo].[TbActiveTrip]    Script Date: 02/27/2014 17:08:33 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[TbActiveTrip](
	[atID] [int] NOT NULL,
	[atPTID] [int] NULL,
	[atUID] [int] NULL,
	[atAccepted] [bit] NOT NULL,
 CONSTRAINT [PK_TbActiveTrip] PRIMARY KEY CLUSTERED 
(
	[atID] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]

GO

ALTER TABLE [dbo].[TbActiveTrip] ADD  CONSTRAINT [DF_TbActiveTrip_atAccepted]  DEFAULT ((0)) FOR [atAccepted]
GO

