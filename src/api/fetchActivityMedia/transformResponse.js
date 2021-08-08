import { format } from 'date-fns'

const transferMediaItem = list => {
  return list.map(item => {
    return {
      mediaId: item.attachmentId,
      eventName: `${item.eventName?.year}年 ${item.eventName?.name}`,
      organization: {
        departmentId: item?.organization?.deptId || '',
        departmentName: item?.organization?.deptName || '跨單位',
        teamId: item?.organization?.teamId || '',
        teamName: item?.organization?.teamName || '',
      },
      description: item.descName,
      mediaViewUrl: item.viewUrl,
      mediaHlsUrl: item.hlsUrl,
      isVideo: item.video,
      fileRotation: item.fileRotation,
      format: item.format,
      accessAuthority: Number(item.accessAuthority),
    }
  })
}

export default ({ list, more }) => {
  const currentTime = format(new Date(), 'yyyy-MM-dd HH:mm:ss')

  return {
    hasMore: more,
    mediaList: transferMediaItem(list),
    currentTime,
  }
}
