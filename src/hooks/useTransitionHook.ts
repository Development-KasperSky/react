import { useEffect } from 'react';
import { TransitionStateHookFn, HookMatchCriteria, HookRegOptions, TransitionHookFn } from '@uirouter/core';
import { useDeepObjectDiff } from './useDeepObjectDiff';
import { useRouter } from './useRouter';
import { useStableCallback } from './useStableCallback';

type HookName = 'onBefore' | 'onStart' | 'onSuccess' | 'onError' | 'onSuccess' | 'onFinish';
type StateHookName = 'onEnter' | 'onRetain' | 'onExit';

export function useTransitionHook(
  hookName: HookName,
  criteria: HookMatchCriteria,
  callback: TransitionHookFn,
  options?: HookRegOptions
);
export function useTransitionHook(
  hookName: StateHookName,
  criteria: HookMatchCriteria,
  callback: TransitionStateHookFn,
  options?: HookRegOptions
);
export function useTransitionHook(
  hookRegistrationFn: HookName | StateHookName,
  criteria: HookMatchCriteria,
  callback: TransitionHookFn | TransitionStateHookFn,
  options?: HookRegOptions
) {
  const { transitionService } = useRouter();
  const stableCallback = useStableCallback(callback);
  useEffect(() => {
    const deregister = transitionService[hookRegistrationFn](criteria, stableCallback as any, options);
    return () => deregister();
  }, [transitionService, hookRegistrationFn, useDeepObjectDiff(criteria), useDeepObjectDiff(options)]);
}