USE [FollowMe]
GO

/****** Object:  Table [dbo].[TbUsers]    Script Date: 02/27/2014 17:12:44 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[TbUsers](
	[uID] [int] NOT NULL,
	[uFirstName] [nvarchar](50) NULL,
	[uLastName] [nvarchar](50) NULL,
	[uEmail] [nvarchar](50) NULL,
	[uPWD] [nvarchar](50) NULL,
 CONSTRAINT [PK_TbUsers] PRIMARY KEY CLUSTERED 
(
	[uID] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]

GO

