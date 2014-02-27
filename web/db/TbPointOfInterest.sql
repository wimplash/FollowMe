USE [FollowMe]
GO

/****** Object:  Table [dbo].[TbPointOfInterest]    Script Date: 02/27/2014 17:26:02 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

SET ANSI_PADDING ON
GO

CREATE TABLE [dbo].[TbPointOfInterest](
	[poiID] [int] NOT NULL,
	[poiTID] [int] NULL,
	[poiPlaceName] [varchar](50) NULL,
	[poiLong] [nvarchar](50) NULL,
	[poiLat] [nvarchar](50) NULL,
 CONSTRAINT [PK_TbPointOfInterest] PRIMARY KEY CLUSTERED 
(
	[poiID] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]

GO

SET ANSI_PADDING OFF
GO

