const transferDetailItem = list => {
  return list.map(item => {
    return {
      organization: {
        organizationId: item.organization?.orgId,
        deparmentId: item.organization?.deptId,
        departmentName: item.organization?.deptName,
        teamId: item.organization?.teamId,
        teamName: item.organization?.teamName,
      },
      imageAmount: item.imageAmount,
      videoAmount: item.videoAmount,
      totalAmount: item.totalAmount,
    }
  })
}

const transferViewItem = list => {
  return list.map((item, index) => {
    return {
      no: index + 1,
      eventYear: item.eventName.year,
      eventName: item.eventName.name,
      imageAmount: item.imageAmount,
      videoAmount: item.videoAmount,
      totalAmount: item.totalAmount,
      detail: transferDetailItem(item.detail),
    }
  })
}

export default ({ list, totalAmount }) => {
  return {
    hasMore: list.more,
    viewList: transferViewItem(list.list),
    totalAmount,
  }
}
