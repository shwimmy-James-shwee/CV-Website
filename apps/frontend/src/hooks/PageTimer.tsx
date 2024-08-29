import React, { useEffect, useRef, useState } from 'react'
import useFetchWithMsal from './useFetchWithMsal'
import { API } from '../shared/endpoints'
import { useLocation } from 'react-router-dom'

type pageTimerType = {
  sessionIdentifier: string | null
  eventUrl: string
  eventStartTime: Date
  eventEndTime?: Date
  eventDuration?: number
  eventParams?: string
}

interface PageTimerProps {
  pageUrl?: string
  onPageClickFunction?: () => void
}

const PageTimer = ({ pageUrl, onPageClickFunction }: PageTimerProps) => {
  const getPageUrl = useLocation().pathname
  const { execute } = useFetchWithMsal()
  const [focused, setFocused] = useState(document.hasFocus())
  const [clicks, setClicks] = useState(0)

  // must be in function method so it only run at the initial render
  const [visitStart] = useState(() => new Date())

  const previousPage = useRef<string>(getPageUrl)
  const focusedRef = useRef<boolean>(focused)
  const startFocusTime = useRef<Date>(new Date())
  const record: pageTimerType = {
    sessionIdentifier: sessionStorage.getItem('session.md5'),
    eventUrl: pageUrl || getPageUrl,
    eventStartTime: visitStart,
  }

  // record time when navigate to another route
  if (previousPage.current !== getPageUrl) {
    sendTimeSpent(previousPage.current)
    previousPage.current = getPageUrl
  }

  // post page time function
  function sendTimeSpent(url?: string | Event) {
    const diff = new Date().getTime() - startFocusTime.current?.getTime()
    execute('POST', API.userActivityLog.root, {
      ...record,
      eventUrl: typeof url == 'string' ? url : record.eventUrl,
      eventDuration: diff,
    })
    startFocusTime.current = new Date()
  }

  // post page time when focus change
  useEffect(() => {
    if (focused) {
      startFocusTime.current = new Date()
    } else {
      sendTimeSpent()
    }

    return () => {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [focused])

  useEffect(() => {
    if (clicks % 5 === 0) {
      sendTimeSpent()
    }
    if (onPageClickFunction) {
      onPageClickFunction()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clicks])

  // setup event listener
  useEffect(() => {
    const isFocused = () => {
      setFocused(true)
      focusedRef.current = true
    }
    const isNotFocused = () => {
      setFocused(false)
      focusedRef.current = false
    }
    const onClicksCall = () => {
      setClicks((prev) => prev + 1)
    }

    // when mouse click
    window.addEventListener('click', onClicksCall)
    // when page refresh, close, or change focus
    window.addEventListener('unload', sendTimeSpent)

    // when page close,
    window.addEventListener('beforeunload', sendTimeSpent)

    // when page change focus ( clicked away)
    window.addEventListener('focus', isFocused)
    window.addEventListener('blur', isNotFocused)

    return () => {
      // clean up function
      window.removeEventListener('click', onClicksCall)
      window.removeEventListener('unload', sendTimeSpent)
      window.removeEventListener('beforeunload', sendTimeSpent)
      window.removeEventListener('focus', isFocused)
      window.removeEventListener('blur', isNotFocused)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return <React.Fragment></React.Fragment>
}

export default PageTimer
